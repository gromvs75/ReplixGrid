// Construct each opening in the developed strip. Periodic seeds give the two
// ends identical neighbours when the strip is wrapped around a sleeve.
type Point = [number, number];

function clip(points: Point[], nx: number, ny: number, limit: number): Point[] {
  const result: Point[] = [];
  points.forEach((a, i) => {
    const b = points[(i + 1) % points.length];
    const da = nx * a[0] + ny * a[1] - limit;
    const db = nx * b[0] + ny * b[1] - limit;
    if (da <= 0) result.push(a);
    if (da * db < 0) {
      const t = da / (da - db);
      result.push([a[0] + t * (b[0] - a[0]), a[1] + t * (b[1] - a[1])]);
    }
  });
  return result;
}

export function cellularOpenings(width: number, height: number, size: number, wrap: boolean): Point[][] {
  if (width <= 0 || height <= 0) return [];
  const columns = Math.max(1, Math.round(width / size));
  const rows = Math.max(1, Math.ceil(height / size));
  if (columns * rows > 12000) throw new Error('Узор слишком мелкий для этой оболочки. Увеличьте крупность.');
  const pitch = width / columns;
  let seed = 919;
  function jitter() {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return (seed / 4294967296 - 0.5) * 0.65;
  }
  const sites: Point[] = Array.from({length: columns * rows}, (_, i) => [
    (i % columns + 0.5 + jitter()) * pitch,
    (Math.floor(i / columns) + 0.5 + jitter()) * size,
  ]);
  const halfRib = Math.min(size * 0.21, Math.max(0.6, size * 0.0675));
  return sites.map(([x,y], i) => {
    const col = i % columns, row = Math.floor(i / columns);
    const left = wrap ? x - width : 0, right = wrap ? x + width : width;
    let cell: Point[] = [[left,0],[right,0],[right,height],[left,height]];
    for (let r = Math.max(0,row-3); r <= Math.min(rows-1,row+3); r++) {
      for (let c = col-3; c <= col+3; c++) {
        if (!wrap && (c < 0 || c >= columns)) continue;
        if (r === row && c === col) continue;
        const copy = Math.floor(c / columns);
        const site = sites[r * columns + c - copy * columns];
        const u = site[0] + copy * width, v = site[1];
        const nx = u-x, ny = v-y;
        cell = clip(cell,nx,ny,(u*u+v*v-x*x-y*y)/2-halfRib*Math.hypot(nx,ny));
      }
    }
    return cell.reverse();
  }).filter(cell => cell.length >= 3);
}
