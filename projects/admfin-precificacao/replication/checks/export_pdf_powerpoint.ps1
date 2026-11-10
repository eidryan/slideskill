# Exporta PPTX para PDF e PNGs pelo PowerPoint real (COM). Foi assim que a lição 18 achou
# marcadores ocos, nulos como zero e números em formato americano que o preview escondia.
# Uso: powershell -File export_pdf_powerpoint.ps1 -Pptx deck.pptx -OutDir saida
param([Parameter(Mandatory)][string]$Pptx, [Parameter(Mandatory)][string]$OutDir)
New-Item -ItemType Directory -Force $OutDir | Out-Null
$ppt = New-Object -ComObject PowerPoint.Application
$p = $ppt.Presentations.Open((Resolve-Path $Pptx).Path, $true, $false, $false)
$p.SaveAs((Join-Path (Resolve-Path $OutDir).Path 'deck.pdf'), 32)
for ($i = 1; $i -le $p.Slides.Count; $i++) { $p.Slides.Item($i).Export((Join-Path (Resolve-Path $OutDir).Path "slide-$i.png"), 'PNG', 1280, 720) }
$p.Close(); $ppt.Quit()
