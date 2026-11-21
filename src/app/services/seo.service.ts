import { Injectable, Inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SeoConfig {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
}

const SITE = 'Madfuns';
const BASE_URL = 'https://madfuns.co.ke';
const DEFAULT_IMAGE = `${BASE_URL}/og-image.jpg`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(
    private readonly titleSvc: Title,
    private readonly meta: Meta,
    @Inject(DOCUMENT) private readonly doc: Document,
  ) {}

  update(config: SeoConfig): void {
    const full = `${config.title} | ${SITE}`;
    const image = config.image || DEFAULT_IMAGE;
    const url = config.url || `${BASE_URL}/`;

    this.titleSvc.setTitle(full);
    this.setCanonical(url);

    // Primary
    this.set('description', config.description);

    // Open Graph
    this.setProp('og:title',       full);
    this.setProp('og:description', config.description);
    this.setProp('og:url',         url);
    this.setProp('og:image',       image);
    this.setProp('og:type',        config.type || 'website');

    // Twitter / X
    this.set('twitter:title',       full);
    this.set('twitter:description', config.description);
    this.set('twitter:image',       image);
  }

  /** Inject an Event schema (JSON-LD) for a single event page. */
  setEventSchema(e: {
    name: string;
    description: string;
    startDate: string;
    location: string;
    image?: string;
    url: string;
    minPrice?: number;
    currency?: string;
  }): void {
    const schema: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: e.name,
      description: e.description,
      startDate: e.startDate,
      location: { '@type': 'Place', name: e.location,
        address: { '@type': 'PostalAddress', addressCountry: 'KE' } },
      image: e.image || DEFAULT_IMAGE,
      url: e.url,
      organizer: { '@type': 'Organization', name: SITE, url: BASE_URL },
    };

    if (e.minPrice !== undefined) {
      schema['offers'] = {
        '@type': 'Offer',
        priceCurrency: e.currency || 'KES',
        price: e.minPrice,
        availability: 'https://schema.org/InStock',
        url: e.url,
      };
    }

    this.injectJsonLd('event-schema', schema);
  }

  private set(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private setProp(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private injectJsonLd(id: string, data: object): void {
    let el = this.doc.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = this.doc.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      this.doc.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
  }
}
