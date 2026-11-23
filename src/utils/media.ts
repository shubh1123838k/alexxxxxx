import amarmartImg from '../assets/images/projects/amarmart.png';
import coderecallImg from '../assets/images/projects/coderecall.png';
import lostifyImg from '../assets/images/projects/lostify.png';
import nyloImg from '../assets/images/projects/nylo.png';
import type { ProjectImage } from '../data/siteContent';

export const deepakPhoto = '/assets/aistudio/download__3__8e372ddc.jpg';

const IMAGE_MAP: Record<string, string> = {
  '../assets/images/deepak.png': deepakPhoto,
  '../assets/images/projects/amarmart.png': amarmartImg,
  '../assets/images/projects/coderecall.png': coderecallImg,
  '../assets/images/projects/lostify.png': lostifyImg,
  '../assets/images/projects/nylo.png': nyloImg,
};

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function supportsFineHover(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export function resolveAssetUrl(folder: string, src?: string | null): string | null {
  if (!src) return null;
  if (/^(https?:)?\/\//.test(src) || src.startsWith('/')) {
    return src;
  }
  return IMAGE_MAP[`../assets/images/${folder}/${src}`] ?? null;
}

export function resolveProjectImage(item: ProjectImage): {
  src: string | null;
  fit?: 'contain' | 'cover';
  bg?: string;
} {
  const obj = typeof item === 'string' ? { src: item } : item ?? { src: '' };
  return {
    src: resolveAssetUrl('projects', obj.src),
    fit: obj.fit,
    bg: obj.bg,
  };
}
