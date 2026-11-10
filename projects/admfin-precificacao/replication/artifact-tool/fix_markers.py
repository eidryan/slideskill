"""Fill scatter markers with their series colour.

@oai/artifact-tool writes <c:marker><c:spPr><a:noFill/></c:spPr>, so PowerPoint
draws hollow markers in theme colours. Rewrite each marker to a solid fill
matching the series fill, with no outline. Usage: fix_markers.py <pptx>
"""
import re
import shutil
import sys
import zipfile

A = 'xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"'
path = sys.argv[1]
tmp = path + '.tmp'


def fix_series(m):
    ser = m.group(0)
    color = re.search(r'<c:spPr><a:solidFill [^>]*><a:srgbClr val="([0-9A-F]{6})"\s*/>', ser)
    if not color:
        return ser
    fill = (f'<c:spPr><a:solidFill {A}><a:srgbClr val="{color.group(1)}"/></a:solidFill>'
            f'<a:ln {A}><a:noFill/></a:ln></c:spPr>')
    return re.sub(rf'<c:spPr><a:noFill {re.escape(A)}\s*/></c:spPr>(?=</c:marker>)', fill, ser)


fixed = 0
with zipfile.ZipFile(path) as src, zipfile.ZipFile(tmp, 'w', zipfile.ZIP_DEFLATED) as dst:
    for item in src.infolist():
        data = src.read(item.filename)
        if re.fullmatch(r'ppt/slides/charts/chart\d+\.xml', item.filename):
            xml = data.decode('utf-8')
            new = re.sub(r'<c:ser>.*?</c:ser>', fix_series, xml, flags=re.S)
            fixed += new != xml
            data = new.encode('utf-8')
        dst.writestr(item, data)
shutil.move(tmp, path)
print(f'charts with filled markers: {fixed}')
