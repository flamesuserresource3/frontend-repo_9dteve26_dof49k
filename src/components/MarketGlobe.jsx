import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MarketGlobe() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.z = 4;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Mesh(
      new THREE.SphereGeometry(1.4, 64, 64),
      new THREE.MeshStandardMaterial({ color: new THREE.Color('#0ea5e9'), metalness: 0.4, roughness: 0.2, transparent: true, opacity: 0.25 })
    );
    scene.add(globe);

    const pts = new THREE.Group();
    const dotGeo = new THREE.SphereGeometry(0.02, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#22d3ee') });
    for (let i = 0; i < 200; i++) {
      const dot = new THREE.Mesh(dotGeo, dotMat.clone());
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = 2 * Math.PI * Math.random();
      const r = 1.4 + 0.02;
      dot.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );
      dot.material.color.setHSL(0.5 + Math.random() * 0.2, 1, 0.6);
      pts.add(dot);
    }
    scene.add(pts);

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    const dir = new THREE.DirectionalLight(0xffffff, 0.8);
    dir.position.set(5, 5, 5);
    scene.add(ambient, dir);

    let raf;
    const onResize = () => {
      if (!mount) return;
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };

    const tick = () => {
      globe.rotation.y += 0.0025;
      pts.rotation.y -= 0.0015;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      mount.removeChild(renderer.domElement);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <section id="globe" className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-white/10 text-white/70">Global Market Globe</div>
        <div ref={mountRef} className="h-[380px] w-full" />
      </div>
    </section>
  );
}
