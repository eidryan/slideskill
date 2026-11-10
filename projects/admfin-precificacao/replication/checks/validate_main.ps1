$ErrorActionPreference = 'Stop'
$root = 'C:\Users\adria\tasks\admfin-v6-work'
$manifest = Get-Content -LiteralPath (Join-Path $root 'content_v6.json') -Raw | ConvertFrom-Json
$deck = Join-Path $root 'output\apresentacao_v6.pptx'
$zip = [System.IO.Compression.ZipFile]::OpenRead($deck)
$tables = @()
$fonts = @()
$sizes = @()
$visible = @()
$noteChecks = @()
try {
  for ($number=1; $number -le 16; $number++) {
    $entry = $zip.GetEntry("ppt/slides/slide$number.xml")
    if (-not $entry) { throw "Missing slide $number" }
    $reader = [System.IO.StreamReader]::new($entry.Open())
    [xml]$xml = $reader.ReadToEnd()
    $reader.Dispose()
    $ns = [System.Xml.XmlNamespaceManager]::new($xml.NameTable)
    $ns.AddNamespace('a','http://schemas.openxmlformats.org/drawingml/2006/main')
    $slideText = ($xml.SelectNodes('//a:t',$ns) | ForEach-Object InnerText) -join ' '
    $visible += $slideText
    if ($slideText -notlike ('*'+$manifest.slides[$number-1].title+'*')) { throw "Title mismatch $number" }
    if ($xml.SelectNodes('//a:tbl',$ns).Count -gt 0) { $tables += $number }
    $fonts += $xml.SelectNodes('//a:latin',$ns) | ForEach-Object { $_.typeface }
    $sizes += $xml.SelectNodes('//a:rPr[@sz]',$ns) | ForEach-Object { [int]$_.sz }
    $reader = [System.IO.StreamReader]::new($zip.GetEntry("ppt/notesSlides/notesSlide$number.xml").Open())
    [xml]$notes = $reader.ReadToEnd()
    $reader.Dispose()
    $nns = [System.Xml.XmlNamespaceManager]::new($notes.NameTable)
    $nns.AddNamespace('a','http://schemas.openxmlformats.org/drawingml/2006/main')
    $noteText = ($notes.SelectNodes('//a:t',$nns) | ForEach-Object InnerText) -join "`n"
    foreach ($part in @($manifest.slides[$number-1].speech,$manifest.slides[$number-1].transition)) {
      if (-not $noteText.Contains($part)) { throw "Notes manifest mismatch $number" }
    }
    foreach ($source in $manifest.slides[$number-1].sources) {
      if (-not $noteText.Contains($source)) { throw "Notes source mismatch $number" }
    }
    $noteChecks += $number
  }
} finally { $zip.Dispose() }
if (($tables -join ',') -ne '4,6,7,11,12,13,14') { throw 'Native table owner mismatch' }
if (($fonts | Select-Object -Unique) -ne 'Arial') { throw 'Font mismatch' }
if (($sizes | Measure-Object -Minimum).Minimum -lt 1200) { throw 'Text below 12 pt' }
$seconds = ($manifest.slides | Measure-Object -Property seconds -Sum).Sum
if ($seconds -gt 1770) { throw 'Timing over 29:30' }
$joined = $visible -join "`n"
foreach ($forbidden in @('13,1%','25/36','8/36','27%','30%','8.000','31,22 por empregado','—')) {
  if ($joined.Contains($forbidden)) { throw "Forbidden visible content: $forbidden" }
}
$script = Get-Content -LiteralPath (Join-Path $root 'output\roteiro_fala_v6.md') -Raw
foreach ($slide in $manifest.slides) {
  if (-not $script.Contains($slide.speech) -or -not $script.Contains($slide.transition)) { throw 'Script not synchronized' }
}
$result = [ordered]@{status='pass';slides=16;notesMatched=$noteChecks.Count;scriptMatched=16;durationSeconds=$seconds;duration='27:10';nativeTableSlides=$tables;font='Arial';minimumFontPt=(($sizes | Measure-Object -Minimum).Minimum/100);forbiddenVisibleContent='none';sha256=(Get-FileHash -LiteralPath $deck -Algorithm SHA256).Hash}
$result | ConvertTo-Json -Depth 8
