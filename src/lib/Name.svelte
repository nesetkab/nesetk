<script lang="ts">
  import { onMount } from "svelte";

  // "hey, i'm neset" — one path per glyph.
  const glyphs = [
    "M0 72V0H13V29.9C14.6 27.2333 16.8333 25.1333 19.7 23.6C22.6333 22 25.9 21.2 29.5 21.2C35.6333 21.2 40.3667 23.1667 43.7 27.1C47.1 30.9667 48.8 36.6333 48.8 44.1V72H35.9V45.3C35.9 41.0333 35.0333 37.8 33.3 35.6C31.6333 33.3333 29 32.2 25.4 32.2C21.8 32.2 18.8333 33.4667 16.5 36C14.1667 38.4667 13 41.9333 13 46.4V72H0Z",
    "M80.0336 73.2C74.9669 73.2 70.5003 72.1333 66.6336 70C62.7669 67.8 59.7336 64.8 57.5336 61C55.3336 57.1333 54.2336 52.6667 54.2336 47.6C54.2336 42.4667 55.3003 37.9 57.4336 33.9C59.6336 29.9 62.6669 26.8 66.5336 24.6C70.4003 22.3333 74.9003 21.2 80.0336 21.2C84.9669 21.2 89.3003 22.2667 93.0336 24.4C96.7669 26.5333 99.6669 29.4333 101.734 33.1C103.867 36.7667 104.934 40.9333 104.934 45.6C104.934 46.2667 104.934 47 104.934 47.8C104.934 48.6 104.867 49.4333 104.734 50.3H63.6336V42.3H91.8336C91.6336 39.1 90.4336 36.5333 88.2336 34.6C86.0336 32.6667 83.3336 31.7 80.1336 31.7C77.7336 31.7 75.5336 32.2333 73.5336 33.3C71.5336 34.3667 69.9336 35.9667 68.7336 38.1C67.6003 40.1667 67.0336 42.8333 67.0336 46.1V48.9C67.0336 51.7 67.6003 54.1333 68.7336 56.2C69.8669 58.2667 71.4003 59.8667 73.3336 61C75.2669 62.0667 77.4669 62.6 79.9336 62.6C82.4669 62.6 84.6003 62.0333 86.3336 60.9C88.0669 59.7667 89.4003 58.2667 90.3336 56.4H103.534C102.6 59.5333 101.034 62.4 98.8336 65C96.7003 67.5333 94.0336 69.5333 90.8336 71C87.6336 72.4667 84.0336 73.2 80.0336 73.2Z",
    "M106.184 94V83.7H116.784C117.784 83.7 118.618 83.5667 119.284 83.3C119.951 83.1 120.584 82.6 121.184 81.8C121.784 81 122.418 79.7667 123.084 78.1L127.384 68.8L126.684 74.5L105.084 22.4H119.184L132.984 57.1L147.384 22.4H161.184L134.784 82.6C133.718 85.0667 132.751 87.0333 131.884 88.5C131.084 90.0333 130.284 91.1667 129.484 91.9C128.684 92.7 127.718 93.2333 126.584 93.5C125.518 93.8333 124.118 94 122.384 94H106.184Z",
    "M149.152 89.2V79.5H153.152C154.418 79.5 155.352 79.1667 155.952 78.5C156.618 77.8333 156.952 76.8 156.952 75.4V72.7H149.852V57.5H166.752V75.4C166.752 79.2667 165.585 82.5333 163.252 85.2C160.985 87.8667 157.618 89.2 153.152 89.2H149.152Z",
    "M0.0999998 156V106.4H13.1V156H0.0999998ZM0.4 98.2V85.6H13V98.2H0.4Z",
    "M19.6914 110.7L25.1914 86H38.7914L32.0978 102.37C30.0375 107.408 25.1348 110.7 19.6914 110.7Z",
    "M35.8112 156V106.4H48.8112V112.5C50.4112 110.233 52.5112 108.467 55.1112 107.2C57.7112 105.867 60.6445 105.2 63.9112 105.2C67.7112 105.2 70.9779 105.967 73.7112 107.5C76.4445 108.967 78.5779 111.133 80.1112 114C81.9779 111.267 84.4112 109.133 87.4112 107.6C90.4112 106 93.7445 105.2 97.4112 105.2C103.878 105.2 108.845 107.167 112.311 111.1C115.778 114.967 117.511 120.633 117.511 128.1V156H104.611V129.3C104.611 125.033 103.778 121.8 102.111 119.6C100.511 117.333 97.9779 116.2 94.5112 116.2C91.1112 116.2 88.3779 117.467 86.3112 120C84.2445 122.467 83.2112 125.933 83.2112 130.4V156H70.3112V129.3C70.3112 125.033 69.4445 121.8 67.7112 119.6C66.0445 117.333 63.5112 116.2 60.1112 116.2C56.7779 116.2 54.0445 117.467 51.9112 120C49.8445 122.467 48.8112 125.933 48.8112 130.4V156H35.8112Z",
    "M164.459 156V106.4H177.459V113.9C179.059 111.233 181.259 109.133 184.059 107.6C186.859 106 190.126 105.2 193.859 105.2C200.059 105.2 204.826 107.167 208.159 111.1C211.493 114.967 213.159 120.633 213.159 128.1V156H200.159V129.3C200.159 125.033 199.293 121.8 197.559 119.6C195.893 117.333 193.226 116.2 189.559 116.2C186.026 116.2 183.126 117.467 180.859 120C178.593 122.467 177.459 125.933 177.459 130.4V156H164.459Z",
    "M242.393 157.2C237.326 157.2 232.86 156.133 228.993 154C225.126 151.8 222.093 148.8 219.893 145C217.693 141.133 216.593 136.667 216.593 131.6C216.593 126.467 217.66 121.9 219.793 117.9C221.993 113.9 225.026 110.8 228.893 108.6C232.76 106.333 237.26 105.2 242.393 105.2C247.326 105.2 251.66 106.267 255.393 108.4C259.126 110.533 262.026 113.433 264.093 117.1C266.226 120.767 267.293 124.933 267.293 129.6C267.293 130.267 267.293 131 267.293 131.8C267.293 132.6 267.226 133.433 267.093 134.3H225.993V126.3H254.193C253.993 123.1 252.793 120.533 250.593 118.6C248.393 116.667 245.693 115.7 242.493 115.7C240.093 115.7 237.893 116.233 235.893 117.3C233.893 118.367 232.293 119.967 231.093 122.1C229.96 124.167 229.393 126.833 229.393 130.1V132.9C229.393 135.7 229.96 138.133 231.093 140.2C232.226 142.267 233.76 143.867 235.693 145C237.626 146.067 239.826 146.6 242.293 146.6C244.826 146.6 246.96 146.033 248.693 144.9C250.426 143.767 251.76 142.267 252.693 140.4H265.893C264.96 143.533 263.393 146.4 261.193 149C259.06 151.533 256.393 153.533 253.193 155C249.993 156.467 246.393 157.2 242.393 157.2Z",
    "M292.83 157.2C286.296 157.2 280.896 155.667 276.63 152.6C272.43 149.533 270.063 145.433 269.53 140.3H282.83C283.296 142.367 284.463 144.033 286.33 145.3C288.263 146.567 290.596 147.2 293.33 147.2C296.196 147.2 298.363 146.667 299.83 145.6C301.363 144.533 302.13 143.233 302.13 141.7C302.13 140.433 301.596 139.433 300.53 138.7C299.463 137.967 297.563 137.433 294.83 137.1C293.83 136.967 292.53 136.767 290.93 136.5C289.33 136.233 288.03 136 287.03 135.8C284.296 135.267 281.796 134.4 279.53 133.2C277.263 132 275.43 130.4 274.03 128.4C272.696 126.4 272.03 123.9 272.03 120.9C272.03 116.5 273.663 112.8 276.93 109.8C280.263 106.733 285.096 105.2 291.43 105.2C297.763 105.2 302.796 106.6 306.53 109.4C310.263 112.2 312.363 116.133 312.83 121.2H300.23C300.03 119.2 299.063 117.7 297.33 116.7C295.663 115.7 293.73 115.2 291.53 115.2C288.93 115.2 286.93 115.7 285.53 116.7C284.13 117.633 283.43 118.8 283.43 120.2C283.43 122.6 285.63 124.2 290.03 125C290.696 125.067 291.53 125.2 292.53 125.4C293.596 125.533 294.696 125.7 295.83 125.9C296.963 126.033 297.863 126.167 298.53 126.3C300.463 126.567 302.363 127 304.23 127.6C306.096 128.2 307.763 129.033 309.23 130.1C310.763 131.1 311.963 132.467 312.83 134.2C313.763 135.933 314.23 138.067 314.23 140.6C314.23 143.867 313.396 146.767 311.73 149.3C310.063 151.767 307.63 153.7 304.43 155.1C301.296 156.5 297.43 157.2 292.83 157.2Z",
    "M344.053 157.2C338.986 157.2 334.52 156.133 330.653 154C326.786 151.8 323.753 148.8 321.553 145C319.353 141.133 318.253 136.667 318.253 131.6C318.253 126.467 319.32 121.9 321.453 117.9C323.653 113.9 326.686 110.8 330.553 108.6C334.42 106.333 338.92 105.2 344.053 105.2C348.986 105.2 353.32 106.267 357.053 108.4C360.786 110.533 363.686 113.433 365.753 117.1C367.886 120.767 368.953 124.933 368.953 129.6C368.953 130.267 368.953 131 368.953 131.8C368.953 132.6 368.886 133.433 368.753 134.3H327.653V126.3H355.853C355.653 123.1 354.453 120.533 352.253 118.6C350.053 116.667 347.353 115.7 344.153 115.7C341.753 115.7 339.553 116.233 337.553 117.3C335.553 118.367 333.953 119.967 332.753 122.1C331.62 124.167 331.053 126.833 331.053 130.1V132.9C331.053 135.7 331.62 138.133 332.753 140.2C333.886 142.267 335.42 143.867 337.353 145C339.286 146.067 341.486 146.6 343.953 146.6C346.486 146.6 348.62 146.033 350.353 144.9C352.086 143.767 353.42 142.267 354.353 140.4H367.553C366.62 143.533 365.053 146.4 362.853 149C360.72 151.533 358.053 153.533 354.853 155C351.653 156.467 348.053 157.2 344.053 157.2Z",
    "M388.745 156C385.412 156 382.579 155.633 380.245 154.9C377.979 154.1 376.279 152.6 375.145 150.4C374.012 148.133 373.445 144.9 373.445 140.7V93.1H386.445V106.4H398.945V117.3H386.445V139.1C386.445 140.767 386.612 142.033 386.945 142.9C387.279 143.7 387.912 144.233 388.845 144.5C389.779 144.767 391.045 144.9 392.645 144.9H398.645V156H388.745Z",
  ];

  // --- tuning ---
  const MAG_MIN = 11; // how far a grabbed feature stretches (viewBox units)
  const MAG_MAX = 27;
  const RADIUS_MIN = 42; // how much of the surrounding stroke follows the pull
  const RADIUS_MAX = 68;
  const HOLD_MIN = 0.55; // seconds a stretch is held
  const HOLD_MAX = 1.05;
  const REST_MIN = 0.85; // gap before the next (single) letter stretches
  const REST_MAX = 1.5;
  const STIFFNESS = 190; // stretch spring
  const DAMPING = 15; // < 2*sqrt(k) => a little elastic snap
  const T_STIFF = 200; // neighbour "make room" spring
  const T_DAMP = 24; // near-critical so spacing looks intentional, not wobbly
  const GAP = 2; // perpendicular overlap tolerance when grouping a row/column

  const DIRS = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  type Anchor = { x: number; y: number };
  type Coord = { bx: number; by: number; a: number };
  type Cmd = { cmd: string; coords: Coord[] };
  type Parsed = { anchors: Anchor[]; cmds: Cmd[] };
  type Box = { minX: number; maxX: number; minY: number; maxY: number };
  // per-glyph motion: stretch amount + rigid translation (to give room)
  type G = {
    amp: number;
    vel: number;
    tx: number;
    ty: number;
    vx: number;
    vy: number;
  };

  let paths: SVGPathElement[] = [];
  let parsed: Parsed[] = [];
  let boxes: Box[] = [];
  let gs: G[] = [];

  // one shared "grab" — only a single letter stretches at any moment
  const sched = {
    active: -1,
    last: -1,
    pulling: false,
    tNext: 0,
    targetAmp: 0,
    dx: 0,
    dy: 0,
    gx: 0,
    gy: 0,
    r: RADIUS_MIN,
  };
  let raf = 0;
  const rand = (a: number, b: number) => a + Math.random() * (b - a);

  function parse(d: string): Parsed {
    const re = /([MLHVCZ])([^MLHVCZ]*)/g;
    const anchors: Anchor[] = [];
    const cmds: Cmd[] = [];
    let cx = 0,
      cy = 0,
      cur = -1;
    const num = (s: string) =>
      (s.match(/-?\d*\.?\d+(?:e[-+]?\d+)?/gi) || []).map(Number);
    const add = (x: number, y: number) => {
      anchors.push({ x, y });
      return anchors.length - 1;
    };
    let m: RegExpExecArray | null;
    while ((m = re.exec(d))) {
      const cmd = m[1];
      const n = num(m[2]);
      if (cmd === "M") {
        cx = n[0];
        cy = n[1];
        cur = add(cx, cy);
        cmds.push({ cmd: "M", coords: [{ bx: cx, by: cy, a: cur }] });
        for (let i = 2; i + 1 < n.length; i += 2) {
          cx = n[i];
          cy = n[i + 1];
          cur = add(cx, cy);
          cmds.push({ cmd: "L", coords: [{ bx: cx, by: cy, a: cur }] });
        }
      } else if (cmd === "L") {
        for (let i = 0; i + 1 < n.length; i += 2) {
          cx = n[i];
          cy = n[i + 1];
          cur = add(cx, cy);
          cmds.push({ cmd: "L", coords: [{ bx: cx, by: cy, a: cur }] });
        }
      } else if (cmd === "H") {
        for (let i = 0; i < n.length; i++) {
          cx = n[i];
          cur = add(cx, cy);
          cmds.push({ cmd: "L", coords: [{ bx: cx, by: cy, a: cur }] });
        }
      } else if (cmd === "V") {
        for (let i = 0; i < n.length; i++) {
          cy = n[i];
          cur = add(cx, cy);
          cmds.push({ cmd: "L", coords: [{ bx: cx, by: cy, a: cur }] });
        }
      } else if (cmd === "C") {
        for (let i = 0; i + 5 < n.length; i += 6) {
          const prev = cur;
          const c1x = n[i],
            c1y = n[i + 1],
            c2x = n[i + 2],
            c2y = n[i + 3];
          cx = n[i + 4];
          cy = n[i + 5];
          cur = add(cx, cy);
          cmds.push({
            cmd: "C",
            coords: [
              { bx: c1x, by: c1y, a: prev },
              { bx: c2x, by: c2y, a: cur },
              { bx: cx, by: cy, a: cur },
            ],
          });
        }
      } else if (cmd === "Z") {
        cmds.push({ cmd: "Z", coords: [] });
      }
    }
    return { anchors, cmds };
  }

  function bbox(p: Parsed): Box {
    let minX = Infinity,
      maxX = -Infinity,
      minY = Infinity,
      maxY = -Infinity;
    for (const a of p.anchors) {
      if (a.x < minX) minX = a.x;
      if (a.x > maxX) maxX = a.x;
      if (a.y < minY) minY = a.y;
      if (a.y > maxY) maxY = a.y;
    }
    return { minX, maxX, minY, maxY };
  }

  const overlap1D = (a0: number, a1: number, b0: number, b1: number) =>
    !(a1 < b0 - GAP || a0 > b1 + GAP);

  function isLeftmost(a: number) {
    const A = boxes[a];
    for (let i = 0; i < boxes.length; i++) {
      if (i === a) continue;
      const b = boxes[i];
      if (overlap1D(b.minY, b.maxY, A.minY, A.maxY) && b.maxX < A.minX)
        return false;
    }
    return true;
  }

  function newPull(t: number) {
    if (sched.active >= 0) {
      gs[sched.active].amp = 0;
      gs[sched.active].vel = 0;
    }
    let a = sched.last;
    while (a === sched.last) a = (Math.random() * glyphs.length) | 0;
    sched.active = a;
    sched.last = a;

    let dirs = DIRS;
    if (isLeftmost(a)) dirs = dirs.filter((d) => d[0] !== -1); // don't shove off the left edge
    const [dx, dy] = dirs[(Math.random() * dirs.length) | 0];
    // anchor furthest along the pull axis = the tip of a stroke
    let best = -Infinity,
      gx = 0,
      gy = 0;
    for (const an of parsed[a].anchors) {
      const proj = an.x * dx + an.y * dy;
      if (proj > best) {
        best = proj;
        gx = an.x;
        gy = an.y;
      }
    }
    sched.dx = dx;
    sched.dy = dy;
    sched.gx = gx;
    sched.gy = gy;
    sched.r = rand(RADIUS_MIN, RADIUS_MAX);
    sched.targetAmp = rand(MAG_MIN, MAG_MAX);
    sched.pulling = true;
    sched.tNext = t + rand(HOLD_MIN, HOLD_MAX);
  }

  // targets for how far each letter must slide so the stretched feature never
  // overlaps a neighbour (cascades down the line, preserving original spacing).
  function computeTargets(amp: number, tTx: Float64Array, tTy: Float64Array) {
    tTx.fill(0);
    tTy.fill(0);
    const a = sched.active;
    if (a < 0) return;
    const A = boxes[a];
    const ext = Math.max(0, amp);

    if (sched.dx !== 0) {
      const row: number[] = [];
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (i === a || overlap1D(b.minY, b.maxY, A.minY, A.maxY)) row.push(i);
      }
      row.sort(
        (p, q) => boxes[p].minX + boxes[p].maxX - (boxes[q].minX + boxes[q].maxX),
      );
      const pos = row.indexOf(a);
      if (sched.dx > 0) {
        let cursor = A.maxX + ext;
        for (let i = pos + 1; i < row.length; i++) {
          const g = row[i],
            nb = row[i - 1];
          const gap = boxes[g].minX - boxes[nb].maxX;
          const shift = Math.max(0, cursor + gap - boxes[g].minX);
          tTx[g] = shift;
          cursor = boxes[g].maxX + shift;
        }
      } else {
        let cursor = A.minX - ext;
        for (let i = pos - 1; i >= 0; i--) {
          const g = row[i],
            nb = row[i + 1];
          const gap = boxes[nb].minX - boxes[g].maxX;
          const shift = Math.min(0, cursor - gap - boxes[g].maxX);
          tTx[g] = shift;
          cursor = boxes[g].minX + shift;
        }
      }
    }

    if (sched.dy !== 0) {
      const col: number[] = [];
      for (let i = 0; i < boxes.length; i++) {
        const b = boxes[i];
        if (i === a || overlap1D(b.minX, b.maxX, A.minX, A.maxX)) col.push(i);
      }
      col.sort(
        (p, q) => boxes[p].minY + boxes[p].maxY - (boxes[q].minY + boxes[q].maxY),
      );
      const pos = col.indexOf(a);
      if (sched.dy > 0) {
        let cursor = A.maxY + ext;
        for (let i = pos + 1; i < col.length; i++) {
          const g = col[i],
            nb = col[i - 1];
          const gap = boxes[g].minY - boxes[nb].maxY;
          const shift = Math.max(0, cursor + gap - boxes[g].minY);
          tTy[g] = shift;
          cursor = boxes[g].maxY + shift;
        }
      } else {
        let cursor = A.minY - ext;
        for (let i = pos - 1; i >= 0; i--) {
          const g = col[i],
            nb = col[i + 1];
          const gap = boxes[nb].minY - boxes[g].maxY;
          const shift = Math.min(0, cursor - gap - boxes[g].maxY);
          tTy[g] = shift;
          cursor = boxes[g].minY + shift;
        }
      }
    }
  }

  function build(i: number): string {
    const p = parsed[i];
    const s = gs[i];
    const active = i === sched.active && Math.abs(s.amp) > 0.01;
    let sx: Float64Array | null = null;
    let sy: Float64Array | null = null;
    if (active) {
      sx = new Float64Array(p.anchors.length);
      sy = new Float64Array(p.anchors.length);
      const r2 = sched.r * sched.r;
      for (let k = 0; k < p.anchors.length; k++) {
        const an = p.anchors[k];
        const dd = (an.x - sched.gx) ** 2 + (an.y - sched.gy) ** 2;
        if (dd >= r2) continue;
        let w = 1 - Math.sqrt(dd) / sched.r;
        w = w * w * (3 - 2 * w); // smoothstep falloff
        sx[k] = sched.dx * s.amp * w;
        sy[k] = sched.dy * s.amp * w;
      }
    }
    let out = "";
    for (const c of p.cmds) {
      if (c.cmd === "Z") {
        out += "Z";
        continue;
      }
      out += c.cmd;
      for (let j = 0; j < c.coords.length; j++) {
        const co = c.coords[j];
        let x = co.bx + s.tx;
        let y = co.by + s.ty;
        if (active) {
          x += sx![co.a];
          y += sy![co.a];
        }
        out += (j ? " " : "") + x.toFixed(2) + " " + y.toFixed(2);
      }
    }
    return out;
  }

  onMount(() => {
    parsed = glyphs.map(parse);
    boxes = parsed.map(bbox);
    gs = parsed.map(() => ({ amp: 0, vel: 0, tx: 0, ty: 0, vx: 0, vy: 0 }));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tTx = new Float64Array(glyphs.length);
    const tTy = new Float64Array(glyphs.length);
    let last = performance.now() / 1000;
    sched.tNext = last + 0.4;

    const frame = (now: number) => {
      const t = now / 1000;
      const dt = Math.min(t - last, 1 / 30);
      last = t;

      // scheduler: one letter at a time — pull, hold, release, rest, next
      if (t >= sched.tNext) {
        if (sched.pulling) {
          sched.targetAmp = 0;
          sched.pulling = false;
          sched.tNext = t + rand(REST_MIN, REST_MAX);
        } else {
          newPull(t);
        }
      }

      // stretch spring (active letter only)
      if (sched.active >= 0) {
        const s = gs[sched.active];
        s.vel += (STIFFNESS * (sched.targetAmp - s.amp) - DAMPING * s.vel) * dt;
        s.amp += s.vel * dt;
      }

      // neighbours slide to make room, then slide back
      computeTargets(sched.active >= 0 ? gs[sched.active].amp : 0, tTx, tTy);
      for (let i = 0; i < gs.length; i++) {
        const s = gs[i];
        s.vx += (T_STIFF * (tTx[i] - s.tx) - T_DAMP * s.vx) * dt;
        s.vy += (T_STIFF * (tTy[i] - s.ty) - T_DAMP * s.vy) * dt;
        s.tx += s.vx * dt;
        s.ty += s.vy * dt;
        if (paths[i]) paths[i].setAttribute("d", build(i));
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  });
</script>

<svg
  viewBox="0 0 399 158"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class="w-full max-w-[399px] h-auto select-none text-foreground overflow-visible"
  aria-label="hey, i'm neset"
  role="img"
>
  {#each glyphs as d, i}
    <path bind:this={paths[i]} {d} fill="currentColor" />
  {/each}
</svg>
