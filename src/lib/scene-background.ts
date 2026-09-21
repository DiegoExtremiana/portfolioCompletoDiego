// Loaded lazily from Background.tsx so Three.js stays out of the main bundle.
import {
  AmbientLight,
  Color,
  DirectionalLight,
  EdgesGeometry,
  Group,
  IcosahedronGeometry,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';

type RGB = [number, number, number];

export interface SceneColors {
  bg: RGB;
  accent: RGB;
  accent2: RGB;
  crystal: RGB;
  ambient: number;
  pointIntensity: number;
  metalness: number;
}

const TWO_PI = Math.PI * 2;

export class SceneBackground {
  private canvas: HTMLCanvasElement;
  private renderer: WebGLRenderer | null = null;
  private scene = new Scene();
  private camera = new PerspectiveCamera(45, 1, 0.1, 100);
  private group = new Group();
  private mesh: Mesh | null = null;
  private edges: LineSegments | null = null;
  private lightA = new PointLight(0xffffff, 40, 0, 1.4);
  private lightB = new PointLight(0xffffff, 40, 0, 1.4);
  private key = new DirectionalLight(0xffffff, 1.1);
  private ambient = new AmbientLight(0xffffff, 0.35);

  private scroll = 0;
  private target = 0;
  private motion = 1;
  private running = false;
  private raf = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  init(): boolean {
    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'low-power',
      });
    } catch {
      return false;
    }
    if (!renderer.getContext()) return false;
    this.renderer = renderer;
    renderer.outputColorSpace = SRGBColorSpace;

    this.camera.position.set(0, 0, 6.5);

    const geometry = new IcosahedronGeometry(2.35, 0);
    const material = new MeshStandardMaterial({
      color: new Color(0x22242f),
      metalness: 0.55,
      roughness: 0.28,
      flatShading: true,
    });
    this.mesh = new Mesh(geometry, material);

    this.edges = new LineSegments(
      new EdgesGeometry(geometry),
      new LineBasicMaterial({ color: 0x8b7bff, transparent: true, opacity: 0.4 }),
    );

    this.group.add(this.mesh, this.edges);
    this.group.rotation.set(0.4, 0.2, 0);
    this.scene.add(this.group);

    this.lightA.position.set(-6, 4, 4);
    this.lightB.position.set(6, -3, 3);
    this.key.position.set(3, 6, 5);
    this.scene.add(this.lightA, this.lightB, this.key, this.ambient);

    this.resize();
    this.render();
    return true;
  }

  setColors(colors: SceneColors) {
    this.renderer?.setClearColor(rgbColor(colors.bg), 1);
    this.lightA.color = rgbColor(colors.accent);
    this.lightB.color = rgbColor(colors.accent2);
    this.lightA.intensity = colors.pointIntensity;
    this.lightB.intensity = colors.pointIntensity;
    this.ambient.intensity = colors.ambient;
    if (this.mesh) {
      const m = this.mesh.material as MeshStandardMaterial;
      m.color = rgbColor(colors.crystal);
      m.metalness = colors.metalness;
    }
    if (this.edges) (this.edges.material as LineBasicMaterial).color = rgbColor(colors.accent);
    this.render();
  }

  setMotion(enabled: boolean) {
    this.motion = enabled ? 1 : 0;
    if (enabled) this.start();
    else {
      this.stop();
      this.scroll = this.target;
      this.render();
    }
  }

  setScroll(target: number) {
    this.target = Math.min(1, Math.max(0, target));
    if (!this.motion) {
      this.scroll = this.target;
      this.render();
    }
  }

  resize() {
    const renderer = this.renderer;
    if (!renderer) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    const cap = w < 768 ? 1.25 : 1.5;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, cap));
    renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.position.z = w < 768 ? 8 : 6.5;
    this.camera.updateProjectionMatrix();
    this.render();
  }

  private render() {
    if (!this.renderer || !this.mesh) return;
    // Rotation depends only on scroll progress, so scrolling back up reverses it.
    this.group.rotation.x = 0.4 + this.scroll * TWO_PI * 1.1;
    this.group.rotation.y = 0.2 + this.scroll * TWO_PI * 1.6;
    this.group.position.y = Math.sin(this.scroll * Math.PI) * 0.25;
    this.renderer.render(this.scene, this.camera);
  }

  private loop = () => {
    if (!this.running) return;
    this.scroll += (this.target - this.scroll) * 0.07;
    this.render();
    this.raf = requestAnimationFrame(this.loop);
  };

  start() {
    if (this.running || !this.motion || !this.renderer) return;
    this.running = true;
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose() {
    this.stop();
    this.mesh?.geometry.dispose();
    (this.mesh?.material as MeshStandardMaterial | undefined)?.dispose();
    this.edges?.geometry.dispose();
    (this.edges?.material as LineBasicMaterial | undefined)?.dispose();
    // Release the GL context so the canvas can be re-acquired (StrictMode remount).
    this.renderer?.forceContextLoss();
    this.renderer?.dispose();
    this.renderer = null;
  }
}

function rgbColor([r, g, b]: RGB): Color {
  return new Color().setRGB(r, g, b, SRGBColorSpace);
}
