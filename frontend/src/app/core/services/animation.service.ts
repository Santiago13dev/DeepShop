import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Servicio de Animaciones con GSAP
 * Animaciones al hacer scroll como PERMIAN
 */
@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    if (this.isBrowser && typeof window !== 'undefined') {
      // Registrar plugin de ScrollTrigger
      gsap.registerPlugin(ScrollTrigger);
    }
  }

  /**
   * Inicializar animaciones de scroll en un componente
   */
  initScrollAnimations(): void {
    if (!this.isBrowser || typeof window === 'undefined') return;

    // Esperar a que el DOM esté completamente listo
    requestAnimationFrame(() => {
      // Fade in desde abajo
      const fadeUpElements = document.querySelectorAll('.fade-in-up');
      fadeUpElements.forEach((element: any) => {
        gsap.from(element, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Fade in desde la izquierda
      const fadeLeftElements = document.querySelectorAll('.fade-in-left');
      fadeLeftElements.forEach((element: any) => {
        gsap.from(element, {
          x: -60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Fade in desde la derecha
      const fadeRightElements = document.querySelectorAll('.fade-in-right');
      fadeRightElements.forEach((element: any) => {
        gsap.from(element, {
          x: 60,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Scale in (zoom)
      const scaleElements = document.querySelectorAll('.scale-in');
      scaleElements.forEach((element: any) => {
        gsap.from(element, {
          scale: 0.8,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Fade in simple
      const fadeElements = document.querySelectorAll('.fade-in');
      fadeElements.forEach((element: any) => {
        gsap.from(element, {
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        });
      });

      // Stagger children (para listas)
      const staggerParents = document.querySelectorAll('.stagger-parent');
      staggerParents.forEach((parent: any) => {
        const children = parent.querySelectorAll('.stagger-child');
        if (children.length > 0) {
          gsap.from(children, {
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: parent,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          });
        }
      });
    });
  }

  /**
   * Animación del hero al cargar
   */
  animateHero(): void {
    if (!this.isBrowser || typeof window === 'undefined') return;

    const timeline = gsap.timeline({ delay: 0.3 });

    const preTitle = document.querySelector('.hero-pre-title');
    const mainTitle = document.querySelector('.hero-main-title');
    const subTitle = document.querySelector('.hero-sub-title');
    const description = document.querySelector('.hero-description');
    const buttons = document.querySelectorAll('.hero-button');
    const scroll = document.querySelector('.hero-scroll');

    if (preTitle) {
      timeline.from(preTitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }

    if (mainTitle) {
      timeline.from(mainTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.5');
    }

    if (subTitle) {
      timeline.from(subTitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.6');
    }

    if (description) {
      timeline.from(description, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5');
    }

    if (buttons.length > 0) {
      timeline.from(buttons, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power3.out'
      }, '-=0.4');
    }

    if (scroll) {
      timeline.from(scroll, {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3');
    }
  }

  /**
   * Parallax suave en elementos
   */
  initParallax(): void {
    if (!this.isBrowser || typeof window === 'undefined') return;

    requestAnimationFrame(() => {
      const parallaxElements = document.querySelectorAll('.parallax');
      parallaxElements.forEach((element: any) => {
        gsap.to(element, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1
          }
        });
      });
    });
  }

  /**
   * Limpiar todas las animaciones
   */
  cleanup(): void {
    if (!this.isBrowser || typeof window === 'undefined') return;
    
    const triggers = ScrollTrigger.getAll();
    triggers.forEach(trigger => trigger.kill());
  }
}
