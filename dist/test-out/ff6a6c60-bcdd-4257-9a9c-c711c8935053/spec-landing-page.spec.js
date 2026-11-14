import {
  DomSanitizer,
  HttpClient,
  Router,
  init_http,
  init_platform_browser,
  init_router,
  provideHttpClient
} from "./chunk-LCJTZP4Q.js";
import {
  ANIMATION_MODULE_TYPE,
  ApplicationRef,
  BehaviorSubject,
  ChangeDetectionStrategy,
  CommonModule,
  Component,
  ComponentFactoryResolver$1,
  DOCUMENT,
  Directive,
  ElementRef,
  FactoryTarget,
  HostBinding,
  HostListener,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  NgIf,
  NgModule,
  NgZone,
  PLATFORM_ID,
  RendererFactory2,
  RuntimeError,
  SecurityContext,
  Subject,
  TestBed,
  ViewEncapsulation,
  __async,
  __commonJS,
  __decorate,
  __esm,
  __spreadProps,
  __spreadValues,
  core_exports,
  init_common,
  init_core,
  init_esm,
  init_testing,
  init_tslib_es6,
  inject,
  isPlatformBrowser,
  makeEnvironmentProviders,
  provideZonelessChangeDetection,
  signal,
  ɵɵngDeclareClassMetadata,
  ɵɵngDeclareComponent,
  ɵɵngDeclareDirective,
  ɵɵngDeclareFactory,
  ɵɵngDeclareInjectable,
  ɵɵngDeclareInjector,
  ɵɵngDeclareNgModule
} from "./chunk-QIG57AXU.js";

// angular:jit:template:src\app\landing-page\landing-page.html
var landing_page_default;
var init_landing_page = __esm({
  "angular:jit:template:src\\app\\landing-page\\landing-page.html"() {
    landing_page_default = `<!-- Navigation -->\r
<header class="nav">\r
  <div class="nav-brand">\r
    <span class="nav-logo">\u{1F39F}\uFE0F EventHub</span>\r
    <span class="nav-badge-fifa">\r
      <svg class="fifa-svg" viewBox="0 0 100 24" fill="currentColor">\r
        <text x="2" y="18" font-family="Arial Black, Impact, sans-serif" font-size="20" font-weight="900" letter-spacing="1.5">FIFA</text>\r
      </svg>\r
      <span>SANCTIONED FIXTURE</span>\r
    </span>\r
  </div>\r
  <div class="nav-links">\r
  <span *ngIf="events.length > 0 " class="text-danger font-bold " style="margin-right:-1.4rem;font-size:20px;box-shadow: 1 4px 9px 0 rgba(1, 3, 4, 0.15);">{{events.length}}</span>  <span class="nav-link nav-link--active">Upcoming Matches & Events</span>\r
  </div>\r
</header>\r
\r
<!-- Hero -->\r
<section class="lp-hero">\r
  <!-- Scrolling image strip \u2014 shows event images, falls back to gradient tiles -->\r
  <div class="hero-strip-wrapper" *ngIf="events.length > 0">\r
    <div class="hero-strip">\r
      <!-- Doubled list so the loop is seamless -->\r
      <ng-container *ngFor="let pass of [0,1]">\r
        <div\r
          *ngFor="let event of events; index as i"\r
          class="strip-tile"\r
          [style.background]="getEventGradient(i)"\r
        >\r
          <img\r
            *ngIf="event.image_url"\r
            [src]="event.image_url"\r
            [alt]="event.name"\r
            class="strip-tile-img"\r
            loading="lazy"\r
            (error)="$any($event.target).style.display='none'"\r
          />\r
          <span class="strip-tile-emoji" aria-hidden="true">{{ getEventEmoji(i) }}</span>\r
        </div>\r
      </ng-container>\r
    </div>\r
  </div>\r
\r
  <h1 class="lp-hero-title">Official Match Tickets & Events</h1>\r
  <p class="lp-hero-sub">Select your ticket category and secure verified seats instantly via Paystack</p>\r
</section>\r
\r
<!-- Loading State -->\r
<div *ngIf="loading" class="lp-status">\r
  <div class="lp-spinner"></div>\r
  <div class="lp-status-text">Fetching official events\u2026</div>\r
</div>\r
\r
<!-- Empty State -->\r
<div *ngIf="!loading && events.length === 0" class="d-flex justify-content-center">\r
  <div class="d-block">\r
  <div style="font-size:48px;margin-bottom:12px">\u{1F3DF}\uFE0F</div>\r
  <div class="lp-status-title">No events available</div>\r
  <div class="lp-status-sub">Please check back soon for upcoming fixtures.</div></div>\r
</div>\r
\r
<!-- Events Grid -->\r
<main *ngIf="!loading && events.length > 0" class="lp-grid">\r
  <article \r
    *ngFor="let event of events; index as i" \r
    class="card event-card" \r
    (click)="getTickets(event)" \r
    role="button" \r
    tabindex="0" \r
    (keyup.enter)="getTickets(event)"\r
    [attr.aria-label]="'View tickets for ' + event.name"\r
  >\r
    <!-- Card Media -->\r
    <div class="ecard-img" [style.background]="getEventGradient(i)">\r
      <div *ngIf="isMatchEvent(event)" class="fifa-event-pill">\r
        \u26BD FIFA Matchday Friendly\r
      </div>\r
      <img\r
        *ngIf="event.image_url"\r
        [src]="event.image_url"\r
        [alt]="event.name"\r
        loading="lazy"\r
        class="ecard-img-photo"\r
        (error)="$any($event.target).style.display='none'"\r
      />\r
      <span class="ecard-emoji" aria-hidden="true">{{ getEventEmoji(i) }}</span>\r
    </div>\r
\r
    <!-- Centered Card Body with equal height distribution -->\r
    <div class="ecard-body">\r
      <div class="ecard-header-group">\r
        <h2 class="ecard-title" [title]="event.name">{{ event.name }}</h2>\r
        <div class="ecard-meta">\r
          <div class="meta-item">\u{1F4C5} {{ formatEventDate(event.event_date) }}</div>\r
          <div class="meta-item">\u{1F4CD} {{ event.venue }}</div>\r
        </div>\r
      </div>\r
\r
      <!-- Ticket price range -->\r
      <div class="ecard-tags-wrapper">\r
        <div class="ecard-tags">\r
          <div class="text-danger fw-bold tag tag-blue">\r
            <span class="text-dark fw-normal" style="font-size:13px;padding-right:5px">Starting</span> KES {{ event.ticket_types[0].price.toFixed(2) }}<ng-container *ngIf="event.ticket_types.length > 1">  \u2192  KES {{ event.ticket_types[event.ticket_types.length - 1].price.toFixed(2) }}</ng-container>\r
          </div>\r
        </div>\r
      </div>\r
\r
      <!-- Action Button -->\r
      <div class="ecard-action">\r
        <button\r
          class="btn btn-primary ecard-btn"\r
          (click)="getTickets(event); $event.stopPropagation()"\r
          [attr.aria-label]="'Get tickets for ' + event.name"\r
        >\r
          Get Tickets \u2192 \r
        </button>\r
      </div>\r
    </div>\r
  </article>\r
</main>\r
\r
<!-- Footer -->\r
<footer class="lp-footer">\r
  <div>\xA9 {{ currentYear }} Madfuns Ticketing \xB7 Talanta Stadium International Showcase</div>\r
  <div class="lp-footer-sub">\u{1F6E1}\uFE0F PCI DSS Level 1 Certified Payments via Paystack</div>\r
</footer>`;
  }
});

// angular:jit:style:src\app\landing-page\landing-page.css
var landing_page_default2;
var init_landing_page2 = __esm({
  "angular:jit:style:src\\app\\landing-page\\landing-page.css"() {
    landing_page_default2 = "/* src/app/landing-page/landing-page.css */\n.nav {\n  height: 60px;\n  background: #111827;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  padding: 0 28px;\n  border-bottom: 1px solid rgba(255, 255, 255, 0.1);\n}\n.nav-brand {\n  display: flex;\n  align-items: center;\n  gap: 14px;\n}\n.nav-logo {\n  color: #ffffff;\n  font-size: 16px;\n  font-weight: 700;\n  letter-spacing: -0.01em;\n}\n.nav-badge-fifa {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  background: rgba(26, 86, 219, 0.18);\n  border: 1px solid #1a56db;\n  color: #93c5fd;\n  padding: 3px 10px;\n  border-radius: 6px;\n  font-size: 10px;\n  font-weight: 700;\n  letter-spacing: 0.08em;\n}\n.fifa-svg {\n  width: 44px;\n  height: 16px;\n  fill: #60a5fa;\n}\n.lp-hero {\n  padding: 36px 20px 32px;\n  text-align: center;\n  background:\n    linear-gradient(\n      180deg,\n      #f8fafc 0%,\n      #ffffff 100%);\n  border-bottom: 1px solid var(--border);\n  overflow: hidden;\n}\n.hero-strip-wrapper {\n  width: 100%;\n  overflow: hidden;\n  margin-bottom: 24px;\n  -webkit-mask-image:\n    linear-gradient(\n      to right,\n      transparent 0%,\n      black 8%,\n      black 92%,\n      transparent 100%);\n  mask-image:\n    linear-gradient(\n      to right,\n      transparent 0%,\n      black 8%,\n      black 92%,\n      transparent 100%);\n}\n.hero-strip {\n  display: flex;\n  gap: 10px;\n  width: max-content;\n  animation: strip-scroll 10s linear infinite;\n}\n.hero-strip:hover {\n  animation-play-state: paused;\n}\n@keyframes strip-scroll {\n  0% {\n    transform: translateX(0);\n  }\n  100% {\n    transform: translateX(-50%);\n  }\n}\n.strip-tile {\n  width: 100px;\n  height: 64px;\n  border-radius: 10px;\n  overflow: hidden;\n  flex-shrink: 0;\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);\n}\n.strip-tile-img {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 1;\n  border-radius: 10px;\n}\n.strip-tile-emoji {\n  font-size: 24px;\n  z-index: 0;\n  opacity: 0.6;\n}\n.lp-hero-title {\n  font-size: 32px;\n  font-weight: 800;\n  color: #0f172a;\n  margin-bottom: 10px;\n  letter-spacing: -0.03em;\n  text-align: center;\n}\n.lp-hero-sub {\n  font-size: 15px;\n  color: #64748b;\n  max-width: 620px;\n  margin: 0 auto;\n  text-align: center;\n}\n.lp-grid {\n  display: grid;\n  grid-template-columns: repeat(3, 1fr);\n  gap: 24px;\n  align-items: stretch;\n  padding: 36px 32px 56px;\n  max-width: 1280px;\n  margin: 0 auto;\n}\n.event-card {\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  background: #ffffff;\n  border: 1px solid #e2e8f0;\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);\n  transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s ease;\n  cursor: pointer;\n}\n.event-card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 16px 32px -8px rgba(15, 23, 42, 0.16);\n  border-color: #cbd5e1;\n}\n.ecard-img {\n  width: 100%;\n  height: 230px;\n  min-height: 230px;\n  position: relative;\n  overflow: hidden;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background: #0f172a;\n}\n.ecard-img-photo {\n  position: absolute;\n  inset: 0;\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  z-index: 1;\n}\n.ecard-emoji {\n  font-size: 44px;\n  z-index: 0;\n}\n.fifa-event-pill {\n  position: absolute;\n  top: 12px;\n  left: 12px;\n  z-index: 2;\n  background: rgba(15, 23, 42, 0.85);\n  -webkit-backdrop-filter: blur(6px);\n  backdrop-filter: blur(6px);\n  color: #f8fafc;\n  font-size: 11px;\n  font-weight: 700;\n  padding: 4px 10px;\n  border-radius: 6px;\n  border: 1px solid rgba(255, 255, 255, 0.2);\n  letter-spacing: 0.02em;\n}\n.ecard-body {\n  flex: 1 1 auto;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  align-items: center;\n  text-align: center;\n  padding: 20px;\n  gap: 16px;\n}\n.ecard-header-group {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n}\n.ecard-title {\n  font-size: 16px;\n  font-weight: 700;\n  color: #0f172a;\n  line-height: 1.4;\n  margin-bottom: 8px;\n  text-align: center;\n  display: -webkit-box;\n  -webkit-line-clamp: 2;\n  -webkit-box-orient: vertical;\n  overflow: hidden;\n  min-height: 44px;\n}\n.ecard-meta {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 4px;\n  font-size: 12px;\n  color: #64748b;\n  text-align: center;\n}\n.meta-item {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n}\n.ecard-tags-wrapper {\n  width: auto;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  min-height: 48px;\n}\n.ecard-tags {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  align-items: center;\n  gap: 6px;\n}\n.tag-blue {\n  background: #eff6ff;\n  color: #000000;\n  border: 1px solid #dbeafe;\n  font-weight: 600;\n  font-size: 11px;\n  padding: 4px 10px;\n  border-radius: 20px;\n}\n.ecard-action {\n  width: 100%;\n  margin-top: auto;\n}\n.ecard-btn {\n  width: 100%;\n  justify-content: center;\n  font-size: 14px;\n  font-weight: 600;\n  padding: 10px;\n  border-radius: 10px;\n  background: #1a56db;\n}\n.ecard-btn:hover {\n  background: #1e40af;\n}\n.lp-footer {\n  text-align: center;\n  padding: 24px;\n  font-size: 12px;\n  color: #64748b;\n  border-top: 1px solid #e2e8f0;\n  background: #ffffff;\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n}\n.lp-footer-sub {\n  font-size: 11px;\n  color: #94a3b8;\n}\n@media (max-width: 1024px) {\n  .lp-grid {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 640px) {\n  .lp-grid {\n    grid-template-columns: 1fr;\n    padding: 20px 16px 40px;\n  }\n  .lp-hero-title {\n    font-size: 24px;\n  }\n}\n/*# sourceMappingURL=landing-page.css.map */\n";
  }
});

// src/environments/environment.ts
var environment;
var init_environment = __esm({
  "src/environments/environment.ts"() {
    "use strict";
    environment = {
      production: false,
      baseUrl: "http://localhost:3000"
      //baseUrl: 'https://madfuns-backend.onrender.com'
    };
  }
});

// node_modules/@angular/animations/fesm2022/private_export.mjs
function trigger(name, definitions) {
  return { type: AnimationMetadataType.Trigger, name, definitions, options: {} };
}
function animate(timings, styles = null) {
  return { type: AnimationMetadataType.Animate, styles, timings };
}
function sequence(steps, options = null) {
  return { type: AnimationMetadataType.Sequence, steps, options };
}
function style(tokens) {
  return { type: AnimationMetadataType.Style, styles: tokens, offset: null };
}
function state(name, styles, options) {
  return { type: AnimationMetadataType.State, name, styles, options };
}
function transition(stateChangeExpr, steps, options = null) {
  return { type: AnimationMetadataType.Transition, expr: stateChangeExpr, animation: steps, options };
}
var AnimationMetadataType;
var init_private_export = __esm({
  "node_modules/@angular/animations/fesm2022/private_export.mjs"() {
    "use strict";
    (function(AnimationMetadataType2) {
      AnimationMetadataType2[AnimationMetadataType2["State"] = 0] = "State";
      AnimationMetadataType2[AnimationMetadataType2["Transition"] = 1] = "Transition";
      AnimationMetadataType2[AnimationMetadataType2["Sequence"] = 2] = "Sequence";
      AnimationMetadataType2[AnimationMetadataType2["Group"] = 3] = "Group";
      AnimationMetadataType2[AnimationMetadataType2["Animate"] = 4] = "Animate";
      AnimationMetadataType2[AnimationMetadataType2["Keyframes"] = 5] = "Keyframes";
      AnimationMetadataType2[AnimationMetadataType2["Style"] = 6] = "Style";
      AnimationMetadataType2[AnimationMetadataType2["Trigger"] = 7] = "Trigger";
      AnimationMetadataType2[AnimationMetadataType2["Reference"] = 8] = "Reference";
      AnimationMetadataType2[AnimationMetadataType2["AnimateChild"] = 9] = "AnimateChild";
      AnimationMetadataType2[AnimationMetadataType2["AnimateRef"] = 10] = "AnimateRef";
      AnimationMetadataType2[AnimationMetadataType2["Query"] = 11] = "Query";
      AnimationMetadataType2[AnimationMetadataType2["Stagger"] = 12] = "Stagger";
    })(AnimationMetadataType || (AnimationMetadataType = {}));
  }
});

// node_modules/@angular/animations/fesm2022/animations.mjs
function issueAnimationCommand(renderer, element, id, command, args) {
  renderer.setProperty(element, `@@${id}:${command}`, args);
}
function unwrapAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  if (type === 0) {
    return renderer;
  } else if (type === 1) {
    return renderer.animationRenderer;
  }
  return null;
}
function isAnimationRenderer(renderer) {
  const type = renderer.\u0275type;
  return type === 0 || type === 1;
}
var AnimationBuilder, AnimationFactory, BrowserAnimationBuilder, BrowserAnimationFactory, RendererAnimationPlayer;
var init_animations = __esm({
  "node_modules/@angular/animations/fesm2022/animations.mjs"() {
    "use strict";
    init_core();
    init_core();
    init_private_export();
    init_private_export();
    AnimationBuilder = class _AnimationBuilder {
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.32", ngImport: core_exports, type: _AnimationBuilder, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.32", ngImport: core_exports, type: _AnimationBuilder, providedIn: "root", useFactory: () => inject(BrowserAnimationBuilder) });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.32", ngImport: core_exports, type: AnimationBuilder, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root", useFactory: () => inject(BrowserAnimationBuilder) }]
    }] });
    AnimationFactory = class {
    };
    BrowserAnimationBuilder = class _BrowserAnimationBuilder extends AnimationBuilder {
      animationModuleType = inject(ANIMATION_MODULE_TYPE, { optional: true });
      _nextAnimationId = 0;
      _renderer;
      constructor(rootRenderer, doc) {
        super();
        const typeData = {
          id: "0",
          encapsulation: ViewEncapsulation.None,
          styles: [],
          data: { animation: [] }
        };
        this._renderer = rootRenderer.createRenderer(doc.body, typeData);
        if (this.animationModuleType === null && !isAnimationRenderer(this._renderer)) {
          throw new RuntimeError(3600, (typeof ngDevMode === "undefined" || ngDevMode) && "Angular detected that the `AnimationBuilder` was injected, but animation support was not enabled. Please make sure that you enable animations in your application by calling `provideAnimations()` or `provideAnimationsAsync()` function.");
        }
      }
      build(animation2) {
        const id = this._nextAnimationId;
        this._nextAnimationId++;
        const entry = Array.isArray(animation2) ? sequence(animation2) : animation2;
        issueAnimationCommand(this._renderer, null, id, "register", [entry]);
        return new BrowserAnimationFactory(id, this._renderer);
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "20.3.32", ngImport: core_exports, type: _BrowserAnimationBuilder, deps: [{ token: RendererFactory2 }, { token: DOCUMENT }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "20.3.32", ngImport: core_exports, type: _BrowserAnimationBuilder, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "20.3.32", ngImport: core_exports, type: BrowserAnimationBuilder, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: RendererFactory2 }, { type: Document, decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }] }] });
    BrowserAnimationFactory = class extends AnimationFactory {
      _id;
      _renderer;
      constructor(_id, _renderer) {
        super();
        this._id = _id;
        this._renderer = _renderer;
      }
      create(element, options) {
        return new RendererAnimationPlayer(this._id, element, options || {}, this._renderer);
      }
    };
    RendererAnimationPlayer = class {
      id;
      element;
      _renderer;
      parentPlayer = null;
      _started = false;
      constructor(id, element, options, _renderer) {
        this.id = id;
        this.element = element;
        this._renderer = _renderer;
        this._command("create", options);
      }
      _listen(eventName, callback) {
        return this._renderer.listen(this.element, `@@${this.id}:${eventName}`, callback);
      }
      _command(command, ...args) {
        issueAnimationCommand(this._renderer, this.element, this.id, command, args);
      }
      onDone(fn) {
        this._listen("done", fn);
      }
      onStart(fn) {
        this._listen("start", fn);
      }
      onDestroy(fn) {
        this._listen("destroy", fn);
      }
      init() {
        this._command("init");
      }
      hasStarted() {
        return this._started;
      }
      play() {
        this._command("play");
        this._started = true;
      }
      pause() {
        this._command("pause");
      }
      restart() {
        this._command("restart");
      }
      finish() {
        this._command("finish");
      }
      destroy() {
        this._command("destroy");
      }
      reset() {
        this._command("reset");
        this._started = false;
      }
      setPosition(p) {
        this._command("setPosition", p);
      }
      getPosition() {
        return unwrapAnimationRenderer(this._renderer)?.engine?.players[this.id]?.getPosition() ?? 0;
      }
      totalTime = 0;
    };
  }
});

// node_modules/ngx-toastr/fesm2022/ngx-toastr.mjs
var ToastContainerDirective, ComponentPortal, BasePortalHost, ToastRef, ToastPackage, DefaultNoComponentGlobalConfig, TOAST_CONFIG, DomPortalHost, OverlayContainer, OverlayRef, Overlay, ToastrService, Toast, DefaultGlobalConfig, provideToastr, ToastrModule, ToastrComponentlessModule, ToastNoAnimation, DefaultNoAnimationsGlobalConfig, ToastNoAnimationModule;
var init_ngx_toastr = __esm({
  "node_modules/ngx-toastr/fesm2022/ngx-toastr.mjs"() {
    "use strict";
    init_core();
    init_core();
    init_animations();
    init_common();
    init_esm();
    init_platform_browser();
    ToastContainerDirective = class _ToastContainerDirective {
      el;
      constructor(el) {
        this.el = el;
      }
      getContainerElement() {
        return this.el.nativeElement;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastContainerDirective, deps: [{ token: ElementRef }], target: FactoryTarget.Directive });
      static \u0275dir = \u0275\u0275ngDeclareDirective({ minVersion: "14.0.0", version: "18.0.0", type: _ToastContainerDirective, isStandalone: true, selector: "[toastContainer]", exportAs: ["toastContainer"], ngImport: core_exports });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: ToastContainerDirective, decorators: [{
      type: Directive,
      args: [{
        selector: "[toastContainer]",
        exportAs: "toastContainer",
        standalone: true
      }]
    }], ctorParameters: () => [{ type: ElementRef }] });
    ComponentPortal = class {
      _attachedHost;
      /** The type of the component that will be instantiated for attachment. */
      component;
      /**
       * [Optional] Where the attached component should live in Angular's *logical* component tree.
       * This is different from where the component *renders*, which is determined by the PortalHost.
       * The origin necessary when the host is outside of the Angular application context.
       */
      viewContainerRef;
      /** Injector used for the instantiation of the component. */
      injector;
      constructor(component, injector) {
        this.component = component;
        this.injector = injector;
      }
      /** Attach this portal to a host. */
      attach(host, newestOnTop) {
        this._attachedHost = host;
        return host.attach(this, newestOnTop);
      }
      /** Detach this portal from its host */
      detach() {
        const host = this._attachedHost;
        if (host) {
          this._attachedHost = void 0;
          return host.detach();
        }
      }
      /** Whether this portal is attached to a host. */
      get isAttached() {
        return this._attachedHost != null;
      }
      /**
       * Sets the PortalHost reference without performing `attach()`. This is used directly by
       * the PortalHost when it is performing an `attach()` or `detach()`.
       */
      setAttachedHost(host) {
        this._attachedHost = host;
      }
    };
    BasePortalHost = class {
      /** The portal currently attached to the host. */
      _attachedPortal;
      /** A function that will permanently dispose this host. */
      _disposeFn;
      attach(portal, newestOnTop) {
        this._attachedPortal = portal;
        return this.attachComponentPortal(portal, newestOnTop);
      }
      detach() {
        if (this._attachedPortal) {
          this._attachedPortal.setAttachedHost();
        }
        this._attachedPortal = void 0;
        if (this._disposeFn) {
          this._disposeFn();
          this._disposeFn = void 0;
        }
      }
      setDisposeFn(fn) {
        this._disposeFn = fn;
      }
    };
    ToastRef = class {
      _overlayRef;
      /** The instance of component opened into the toast. */
      componentInstance;
      /** Count of duplicates of this toast */
      duplicatesCount = 0;
      /** Subject for notifying the user that the toast has finished closing. */
      _afterClosed = new Subject();
      /** triggered when toast is activated */
      _activate = new Subject();
      /** notifies the toast that it should close before the timeout */
      _manualClose = new Subject();
      /** notifies the toast that it should reset the timeouts */
      _resetTimeout = new Subject();
      /** notifies the toast that it should count a duplicate toast */
      _countDuplicate = new Subject();
      constructor(_overlayRef) {
        this._overlayRef = _overlayRef;
      }
      manualClose() {
        this._manualClose.next();
        this._manualClose.complete();
      }
      manualClosed() {
        return this._manualClose.asObservable();
      }
      timeoutReset() {
        return this._resetTimeout.asObservable();
      }
      countDuplicate() {
        return this._countDuplicate.asObservable();
      }
      /**
       * Close the toast.
       */
      close() {
        this._overlayRef.detach();
        this._afterClosed.next();
        this._manualClose.next();
        this._afterClosed.complete();
        this._manualClose.complete();
        this._activate.complete();
        this._resetTimeout.complete();
        this._countDuplicate.complete();
      }
      /** Gets an observable that is notified when the toast is finished closing. */
      afterClosed() {
        return this._afterClosed.asObservable();
      }
      isInactive() {
        return this._activate.isStopped;
      }
      activate() {
        this._activate.next();
        this._activate.complete();
      }
      /** Gets an observable that is notified when the toast has started opening. */
      afterActivate() {
        return this._activate.asObservable();
      }
      /** Reset the toast timouts and count duplicates */
      onDuplicate(resetTimeout, countDuplicate) {
        if (resetTimeout) {
          this._resetTimeout.next();
        }
        if (countDuplicate) {
          this._countDuplicate.next(++this.duplicatesCount);
        }
      }
    };
    ToastPackage = class {
      toastId;
      config;
      message;
      title;
      toastType;
      toastRef;
      _onTap = new Subject();
      _onAction = new Subject();
      constructor(toastId, config, message, title, toastType, toastRef) {
        this.toastId = toastId;
        this.config = config;
        this.message = message;
        this.title = title;
        this.toastType = toastType;
        this.toastRef = toastRef;
        this.toastRef.afterClosed().subscribe(() => {
          this._onAction.complete();
          this._onTap.complete();
        });
      }
      /** Fired on click */
      triggerTap() {
        this._onTap.next();
        if (this.config.tapToDismiss) {
          this._onTap.complete();
        }
      }
      onTap() {
        return this._onTap.asObservable();
      }
      /** available for use in custom toast */
      triggerAction(action) {
        this._onAction.next(action);
      }
      onAction() {
        return this._onAction.asObservable();
      }
    };
    DefaultNoComponentGlobalConfig = {
      maxOpened: 0,
      autoDismiss: false,
      newestOnTop: true,
      preventDuplicates: false,
      countDuplicates: false,
      resetTimeoutOnDuplicate: false,
      includeTitleDuplicates: false,
      iconClasses: {
        error: "toast-error",
        info: "toast-info",
        success: "toast-success",
        warning: "toast-warning"
      },
      // Individual
      closeButton: false,
      disableTimeOut: false,
      timeOut: 5e3,
      extendedTimeOut: 1e3,
      enableHtml: false,
      progressBar: false,
      toastClass: "ngx-toastr",
      positionClass: "toast-top-right",
      titleClass: "toast-title",
      messageClass: "toast-message",
      easing: "ease-in",
      easeTime: 300,
      tapToDismiss: true,
      onActivateTick: false,
      progressAnimation: "decreasing"
    };
    TOAST_CONFIG = new InjectionToken("ToastConfig");
    DomPortalHost = class extends BasePortalHost {
      _hostDomElement;
      _componentFactoryResolver;
      _appRef;
      constructor(_hostDomElement, _componentFactoryResolver, _appRef) {
        super();
        this._hostDomElement = _hostDomElement;
        this._componentFactoryResolver = _componentFactoryResolver;
        this._appRef = _appRef;
      }
      /**
       * Attach the given ComponentPortal to DOM element using the ComponentFactoryResolver.
       * @param portal Portal to be attached
       */
      attachComponentPortal(portal, newestOnTop) {
        const componentFactory = this._componentFactoryResolver.resolveComponentFactory(portal.component);
        let componentRef;
        componentRef = componentFactory.create(portal.injector);
        this._appRef.attachView(componentRef.hostView);
        this.setDisposeFn(() => {
          this._appRef.detachView(componentRef.hostView);
          componentRef.destroy();
        });
        if (newestOnTop) {
          this._hostDomElement.insertBefore(this._getComponentRootNode(componentRef), this._hostDomElement.firstChild);
        } else {
          this._hostDomElement.appendChild(this._getComponentRootNode(componentRef));
        }
        return componentRef;
      }
      /** Gets the root HTMLElement for an instantiated component. */
      _getComponentRootNode(componentRef) {
        return componentRef.hostView.rootNodes[0];
      }
    };
    OverlayContainer = class _OverlayContainer {
      _document = inject(DOCUMENT);
      _containerElement;
      ngOnDestroy() {
        if (this._containerElement && this._containerElement.parentNode) {
          this._containerElement.parentNode.removeChild(this._containerElement);
        }
      }
      /**
       * This method returns the overlay container element. It will lazily
       * create the element the first time  it is called to facilitate using
       * the container in non-browser environments.
       * @returns the container element
       */
      getContainerElement() {
        if (!this._containerElement) {
          this._createContainer();
        }
        return this._containerElement;
      }
      /**
       * Create the overlay container element, which is simply a div
       * with the 'cdk-overlay-container' class on the document body
       * and 'aria-live="polite"'
       */
      _createContainer() {
        const container = this._document.createElement("div");
        container.classList.add("overlay-container");
        container.setAttribute("aria-live", "polite");
        this._document.body.appendChild(container);
        this._containerElement = container;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _OverlayContainer, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _OverlayContainer, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: OverlayContainer, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    OverlayRef = class {
      _portalHost;
      constructor(_portalHost) {
        this._portalHost = _portalHost;
      }
      attach(portal, newestOnTop = true) {
        return this._portalHost.attach(portal, newestOnTop);
      }
      /**
       * Detaches an overlay from a portal.
       * @returns Resolves when the overlay has been detached.
       */
      detach() {
        return this._portalHost.detach();
      }
    };
    Overlay = class _Overlay {
      _overlayContainer = inject(OverlayContainer);
      _componentFactoryResolver = inject(ComponentFactoryResolver$1);
      _appRef = inject(ApplicationRef);
      _document = inject(DOCUMENT);
      // Namespace panes by overlay container
      _paneElements = /* @__PURE__ */ new Map();
      /**
       * Creates an overlay.
       * @returns A reference to the created overlay.
       */
      create(positionClass, overlayContainer) {
        return this._createOverlayRef(this.getPaneElement(positionClass, overlayContainer));
      }
      getPaneElement(positionClass = "", overlayContainer) {
        if (!this._paneElements.get(overlayContainer)) {
          this._paneElements.set(overlayContainer, {});
        }
        if (!this._paneElements.get(overlayContainer)[positionClass]) {
          this._paneElements.get(overlayContainer)[positionClass] = this._createPaneElement(positionClass, overlayContainer);
        }
        return this._paneElements.get(overlayContainer)[positionClass];
      }
      /**
       * Creates the DOM element for an overlay and appends it to the overlay container.
       * @returns Newly-created pane element
       */
      _createPaneElement(positionClass, overlayContainer) {
        const pane = this._document.createElement("div");
        pane.id = "toast-container";
        pane.classList.add(positionClass);
        pane.classList.add("toast-container");
        if (!overlayContainer) {
          this._overlayContainer.getContainerElement().appendChild(pane);
        } else {
          overlayContainer.getContainerElement().appendChild(pane);
        }
        return pane;
      }
      /**
       * Create a DomPortalHost into which the overlay content can be loaded.
       * @param pane The DOM element to turn into a portal host.
       * @returns A portal host for the given DOM element.
       */
      _createPortalHost(pane) {
        return new DomPortalHost(pane, this._componentFactoryResolver, this._appRef);
      }
      /**
       * Creates an OverlayRef for an overlay in the given DOM element.
       * @param pane DOM element for the overlay
       */
      _createOverlayRef(pane) {
        return new OverlayRef(this._createPortalHost(pane));
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _Overlay, deps: [], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _Overlay, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: Overlay, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }] });
    ToastrService = class _ToastrService {
      overlay;
      _injector;
      sanitizer;
      ngZone;
      toastrConfig;
      currentlyActive = 0;
      toasts = [];
      overlayContainer;
      previousToastMessage;
      index = 0;
      constructor(token, overlay, _injector, sanitizer, ngZone) {
        this.overlay = overlay;
        this._injector = _injector;
        this.sanitizer = sanitizer;
        this.ngZone = ngZone;
        this.toastrConfig = __spreadValues(__spreadValues({}, token.default), token.config);
        if (token.config.iconClasses) {
          this.toastrConfig.iconClasses = __spreadValues(__spreadValues({}, token.default.iconClasses), token.config.iconClasses);
        }
      }
      /** show toast */
      show(message, title, override = {}, type = "") {
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show successful toast */
      success(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.success || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show error toast */
      error(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.error || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show info toast */
      info(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.info || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /** show warning toast */
      warning(message, title, override = {}) {
        const type = this.toastrConfig.iconClasses.warning || "";
        return this._preBuildNotification(type, message, title, this.applyConfig(override));
      }
      /**
       * Remove all or a single toast by id
       */
      clear(toastId) {
        for (const toast of this.toasts) {
          if (toastId !== void 0) {
            if (toast.toastId === toastId) {
              toast.toastRef.manualClose();
              return;
            }
          } else {
            toast.toastRef.manualClose();
          }
        }
      }
      /**
       * Remove and destroy a single toast by id
       */
      remove(toastId) {
        const found = this._findToast(toastId);
        if (!found) {
          return false;
        }
        found.activeToast.toastRef.close();
        this.toasts.splice(found.index, 1);
        this.currentlyActive = this.currentlyActive - 1;
        if (!this.toastrConfig.maxOpened || !this.toasts.length) {
          return false;
        }
        if (this.currentlyActive < this.toastrConfig.maxOpened && this.toasts[this.currentlyActive]) {
          const p = this.toasts[this.currentlyActive].toastRef;
          if (!p.isInactive()) {
            this.currentlyActive = this.currentlyActive + 1;
            p.activate();
          }
        }
        return true;
      }
      /**
       * Determines if toast message is already shown
       */
      findDuplicate(title = "", message = "", resetOnDuplicate, countDuplicates) {
        const { includeTitleDuplicates } = this.toastrConfig;
        for (const toast of this.toasts) {
          const hasDuplicateTitle = includeTitleDuplicates && toast.title === title;
          if ((!includeTitleDuplicates || hasDuplicateTitle) && toast.message === message) {
            toast.toastRef.onDuplicate(resetOnDuplicate, countDuplicates);
            return toast;
          }
        }
        return null;
      }
      /** create a clone of global config and apply individual settings */
      applyConfig(override = {}) {
        return __spreadValues(__spreadValues({}, this.toastrConfig), override);
      }
      /**
       * Find toast object by id
       */
      _findToast(toastId) {
        for (let i = 0; i < this.toasts.length; i++) {
          if (this.toasts[i].toastId === toastId) {
            return { index: i, activeToast: this.toasts[i] };
          }
        }
        return null;
      }
      /**
       * Determines the need to run inside angular's zone then builds the toast
       */
      _preBuildNotification(toastType, message, title, config) {
        if (config.onActivateTick) {
          return this.ngZone.run(() => this._buildNotification(toastType, message, title, config));
        }
        return this._buildNotification(toastType, message, title, config);
      }
      /**
       * Creates and attaches toast data to component
       * returns the active toast, or in case preventDuplicates is enabled the original/non-duplicate active toast.
       */
      _buildNotification(toastType, message, title, config) {
        if (!config.toastComponent) {
          throw new Error("toastComponent required");
        }
        const duplicate = this.findDuplicate(title, message, this.toastrConfig.resetTimeoutOnDuplicate && config.timeOut > 0, this.toastrConfig.countDuplicates);
        if ((this.toastrConfig.includeTitleDuplicates && title || message) && this.toastrConfig.preventDuplicates && duplicate !== null) {
          return duplicate;
        }
        this.previousToastMessage = message;
        let keepInactive = false;
        if (this.toastrConfig.maxOpened && this.currentlyActive >= this.toastrConfig.maxOpened) {
          keepInactive = true;
          if (this.toastrConfig.autoDismiss) {
            this.clear(this.toasts[0].toastId);
          }
        }
        const overlayRef = this.overlay.create(config.positionClass, this.overlayContainer);
        this.index = this.index + 1;
        let sanitizedMessage = message;
        if (message && config.enableHtml) {
          sanitizedMessage = this.sanitizer.sanitize(SecurityContext.HTML, message);
        }
        const toastRef = new ToastRef(overlayRef);
        const toastPackage = new ToastPackage(this.index, config, sanitizedMessage, title, toastType, toastRef);
        const providers = [{ provide: ToastPackage, useValue: toastPackage }];
        const toastInjector = Injector.create({ providers, parent: this._injector });
        const component = new ComponentPortal(config.toastComponent, toastInjector);
        const portal = overlayRef.attach(component, config.newestOnTop);
        toastRef.componentInstance = portal.instance;
        const ins = {
          toastId: this.index,
          title: title || "",
          message: message || "",
          toastRef,
          onShown: toastRef.afterActivate(),
          onHidden: toastRef.afterClosed(),
          onTap: toastPackage.onTap(),
          onAction: toastPackage.onAction(),
          portal
        };
        if (!keepInactive) {
          this.currentlyActive = this.currentlyActive + 1;
          setTimeout(() => {
            ins.toastRef.activate();
          });
        }
        this.toasts.push(ins);
        return ins;
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrService, deps: [{ token: TOAST_CONFIG }, { token: Overlay }, { token: Injector }, { token: DomSanitizer }, { token: NgZone }], target: FactoryTarget.Injectable });
      static \u0275prov = \u0275\u0275ngDeclareInjectable({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrService, providedIn: "root" });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: ToastrService, decorators: [{
      type: Injectable,
      args: [{ providedIn: "root" }]
    }], ctorParameters: () => [{ type: void 0, decorators: [{
      type: Inject,
      args: [TOAST_CONFIG]
    }] }, { type: Overlay }, { type: Injector }, { type: DomSanitizer }, { type: NgZone }] });
    Toast = class _Toast {
      toastrService;
      toastPackage;
      ngZone;
      message;
      title;
      options;
      duplicatesCount;
      originalTimeout;
      /** width of progress bar */
      width = signal(-1);
      /** a combination of toast type and options.toastClass */
      toastClasses = "";
      state;
      /** controls animation */
      get _state() {
        return this.state();
      }
      /** hides component when waiting to be displayed */
      get displayStyle() {
        if (this.state().value === "inactive") {
          return "none";
        }
        return;
      }
      timeout;
      intervalId;
      hideTime;
      sub;
      sub1;
      sub2;
      sub3;
      constructor(toastrService, toastPackage, ngZone) {
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.ngZone = ngZone;
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
          this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
          this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(() => {
          this.resetTimeout();
        });
        this.sub3 = toastPackage.toastRef.countDuplicate().subscribe((count) => {
          this.duplicatesCount = count;
        });
        this.state = signal({
          value: "inactive",
          params: {
            easeTime: this.toastPackage.config.easeTime,
            easing: "ease-in"
          }
        });
      }
      ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
      }
      /**
       * activates toast and sets timeout
       */
      activateToast() {
        this.state.update((state2) => __spreadProps(__spreadValues({}, state2), { value: "active" }));
        if (!(this.options.disableTimeOut === true || this.options.disableTimeOut === "timeOut") && this.options.timeOut) {
          this.outsideTimeout(() => this.remove(), this.options.timeOut);
          this.hideTime = (/* @__PURE__ */ new Date()).getTime() + this.options.timeOut;
          if (this.options.progressBar) {
            this.outsideInterval(() => this.updateProgress(), 10);
          }
        }
      }
      /**
       * updates progress bar width
       */
      updateProgress() {
        if (this.width() === 0 || this.width() === 100 || !this.options.timeOut) {
          return;
        }
        const now = (/* @__PURE__ */ new Date()).getTime();
        const remaining = this.hideTime - now;
        this.width.set(remaining / this.options.timeOut * 100);
        if (this.options.progressAnimation === "increasing") {
          this.width.update((width) => 100 - width);
        }
        if (this.width() <= 0) {
          this.width.set(0);
        }
        if (this.width() >= 100) {
          this.width.set(100);
        }
      }
      resetTimeout() {
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state.update((state2) => __spreadProps(__spreadValues({}, state2), { value: "active" }));
        this.outsideTimeout(() => this.remove(), this.originalTimeout);
        this.options.timeOut = this.originalTimeout;
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.options.timeOut || 0);
        this.width.set(-1);
        if (this.options.progressBar) {
          this.outsideInterval(() => this.updateProgress(), 10);
        }
      }
      /**
       * tells toastrService to remove this toast after animation time
       */
      remove() {
        if (this.state().value === "removed") {
          return;
        }
        clearTimeout(this.timeout);
        this.state.update((state2) => __spreadProps(__spreadValues({}, state2), { value: "removed" }));
        this.outsideTimeout(() => this.toastrService.remove(this.toastPackage.toastId), +this.toastPackage.config.easeTime);
      }
      tapToast() {
        if (this.state().value === "removed") {
          return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
          this.remove();
        }
      }
      stickAround() {
        if (this.state().value === "removed") {
          return;
        }
        if (this.options.disableTimeOut !== "extendedTimeOut") {
          clearTimeout(this.timeout);
          this.options.timeOut = 0;
          this.hideTime = 0;
          clearInterval(this.intervalId);
          this.width.set(0);
        }
      }
      delayedHideToast() {
        if (this.options.disableTimeOut === true || this.options.disableTimeOut === "extendedTimeOut" || this.options.extendedTimeOut === 0 || this.state().value === "removed") {
          return;
        }
        this.outsideTimeout(() => this.remove(), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.options.timeOut || 0);
        this.width.set(-1);
        if (this.options.progressBar) {
          this.outsideInterval(() => this.updateProgress(), 10);
        }
      }
      outsideTimeout(func, timeout) {
        if (this.ngZone) {
          this.ngZone.runOutsideAngular(() => this.timeout = setTimeout(() => this.runInsideAngular(func), timeout));
        } else {
          this.timeout = setTimeout(() => func(), timeout);
        }
      }
      outsideInterval(func, timeout) {
        if (this.ngZone) {
          this.ngZone.runOutsideAngular(() => this.intervalId = setInterval(() => this.runInsideAngular(func), timeout));
        } else {
          this.intervalId = setInterval(() => func(), timeout);
        }
      }
      runInsideAngular(func) {
        if (this.ngZone) {
          this.ngZone.run(() => func());
        } else {
          func();
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _Toast, deps: [{ token: ToastrService }, { token: ToastPackage }, { token: NgZone }], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0", type: _Toast, isStandalone: true, selector: "[toast-component]", host: { listeners: { "click": "tapToast()", "mouseenter": "stickAround()", "mouseleave": "delayedHideToast()" }, properties: { "class": "this.toastClasses", "@flyInOut": "this._state", "style.display": "this.displayStyle" } }, ngImport: core_exports, template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width() + '%'"></div>
  </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger("flyInOut", [
          state("inactive", style({ opacity: 0 })),
          state("active", style({ opacity: 1 })),
          state("removed", style({ opacity: 0 })),
          transition("inactive => active", animate("{{ easeTime }}ms {{ easing }}")),
          transition("active => removed", animate("{{ easeTime }}ms {{ easing }}"))
        ])
      ], changeDetection: ChangeDetectionStrategy.OnPush });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: Toast, decorators: [{
      type: Component,
      args: [{
        selector: "[toast-component]",
        template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width() + '%'"></div>
  </div>
  `,
        animations: [
          trigger("flyInOut", [
            state("inactive", style({ opacity: 0 })),
            state("active", style({ opacity: 1 })),
            state("removed", style({ opacity: 0 })),
            transition("inactive => active", animate("{{ easeTime }}ms {{ easing }}")),
            transition("active => removed", animate("{{ easeTime }}ms {{ easing }}"))
          ])
        ],
        preserveWhitespaces: false,
        standalone: true,
        imports: [NgIf],
        changeDetection: ChangeDetectionStrategy.OnPush
      }]
    }], ctorParameters: () => [{ type: ToastrService }, { type: ToastPackage }, { type: NgZone }], propDecorators: { toastClasses: [{
      type: HostBinding,
      args: ["class"]
    }], _state: [{
      type: HostBinding,
      args: ["@flyInOut"]
    }], displayStyle: [{
      type: HostBinding,
      args: ["style.display"]
    }], tapToast: [{
      type: HostListener,
      args: ["click"]
    }], stickAround: [{
      type: HostListener,
      args: ["mouseenter"]
    }], delayedHideToast: [{
      type: HostListener,
      args: ["mouseleave"]
    }] } });
    DefaultGlobalConfig = __spreadProps(__spreadValues({}, DefaultNoComponentGlobalConfig), {
      toastComponent: Toast
    });
    provideToastr = (config = {}) => {
      const providers = [
        {
          provide: TOAST_CONFIG,
          useValue: {
            default: DefaultGlobalConfig,
            config
          }
        }
      ];
      return makeEnvironmentProviders(providers);
    };
    ToastrModule = class _ToastrModule {
      static forRoot(config = {}) {
        return {
          ngModule: _ToastrModule,
          providers: [provideToastr(config)]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrModule, imports: [Toast], exports: [Toast] });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrModule });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: ToastrModule, decorators: [{
      type: NgModule,
      args: [{
        imports: [Toast],
        exports: [Toast]
      }]
    }] });
    ToastrComponentlessModule = class _ToastrComponentlessModule {
      static forRoot(config = {}) {
        return {
          ngModule: ToastrModule,
          providers: [
            {
              provide: TOAST_CONFIG,
              useValue: {
                default: DefaultNoComponentGlobalConfig,
                config
              }
            }
          ]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrComponentlessModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrComponentlessModule });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastrComponentlessModule });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: ToastrComponentlessModule, decorators: [{
      type: NgModule,
      args: [{}]
    }] });
    ToastNoAnimation = class _ToastNoAnimation {
      toastrService;
      toastPackage;
      appRef;
      message;
      title;
      options;
      duplicatesCount;
      originalTimeout;
      /** width of progress bar */
      width = signal(-1);
      /** a combination of toast type and options.toastClass */
      toastClasses = "";
      /** hides component when waiting to be displayed */
      get displayStyle() {
        if (this.state() === "inactive") {
          return "none";
        }
        return null;
      }
      /** controls animation */
      state = signal("inactive");
      timeout;
      intervalId;
      hideTime;
      sub;
      sub1;
      sub2;
      sub3;
      constructor(toastrService, toastPackage, appRef) {
        this.toastrService = toastrService;
        this.toastPackage = toastPackage;
        this.appRef = appRef;
        this.message = toastPackage.message;
        this.title = toastPackage.title;
        this.options = toastPackage.config;
        this.originalTimeout = toastPackage.config.timeOut;
        this.toastClasses = `${toastPackage.toastType} ${toastPackage.config.toastClass}`;
        this.sub = toastPackage.toastRef.afterActivate().subscribe(() => {
          this.activateToast();
        });
        this.sub1 = toastPackage.toastRef.manualClosed().subscribe(() => {
          this.remove();
        });
        this.sub2 = toastPackage.toastRef.timeoutReset().subscribe(() => {
          this.resetTimeout();
        });
        this.sub3 = toastPackage.toastRef.countDuplicate().subscribe((count) => {
          this.duplicatesCount = count;
        });
      }
      ngOnDestroy() {
        this.sub.unsubscribe();
        this.sub1.unsubscribe();
        this.sub2.unsubscribe();
        this.sub3.unsubscribe();
        clearInterval(this.intervalId);
        clearTimeout(this.timeout);
      }
      /**
       * activates toast and sets timeout
       */
      activateToast() {
        this.state.set("active");
        if (!(this.options.disableTimeOut === true || this.options.disableTimeOut === "timeOut") && this.options.timeOut) {
          this.timeout = setTimeout(() => {
            this.remove();
          }, this.options.timeOut);
          this.hideTime = (/* @__PURE__ */ new Date()).getTime() + this.options.timeOut;
          if (this.options.progressBar) {
            this.intervalId = setInterval(() => this.updateProgress(), 10);
          }
        }
        if (this.options.onActivateTick) {
          this.appRef.tick();
        }
      }
      /**
       * updates progress bar width
       */
      updateProgress() {
        if (this.width() === 0 || this.width() === 100 || !this.options.timeOut) {
          return;
        }
        const now = (/* @__PURE__ */ new Date()).getTime();
        const remaining = this.hideTime - now;
        this.width.set(remaining / this.options.timeOut * 100);
        if (this.options.progressAnimation === "increasing") {
          this.width.update((width) => 100 - width);
        }
        if (this.width() <= 0) {
          this.width.set(0);
        }
        if (this.width() >= 100) {
          this.width.set(100);
        }
      }
      resetTimeout() {
        clearTimeout(this.timeout);
        clearInterval(this.intervalId);
        this.state.set("active");
        this.options.timeOut = this.originalTimeout;
        this.timeout = setTimeout(() => this.remove(), this.originalTimeout);
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.originalTimeout || 0);
        this.width.set(-1);
        if (this.options.progressBar) {
          this.intervalId = setInterval(() => this.updateProgress(), 10);
        }
      }
      /**
       * tells toastrService to remove this toast after animation time
       */
      remove() {
        if (this.state() === "removed") {
          return;
        }
        clearTimeout(this.timeout);
        this.state.set("removed");
        this.timeout = setTimeout(() => this.toastrService.remove(this.toastPackage.toastId));
      }
      tapToast() {
        if (this.state() === "removed") {
          return;
        }
        this.toastPackage.triggerTap();
        if (this.options.tapToDismiss) {
          this.remove();
        }
      }
      stickAround() {
        if (this.state() === "removed") {
          return;
        }
        clearTimeout(this.timeout);
        this.options.timeOut = 0;
        this.hideTime = 0;
        clearInterval(this.intervalId);
        this.width.set(0);
      }
      delayedHideToast() {
        if (this.options.disableTimeOut === true || this.options.disableTimeOut === "extendedTimeOut" || this.options.extendedTimeOut === 0 || this.state() === "removed") {
          return;
        }
        this.timeout = setTimeout(() => this.remove(), this.options.extendedTimeOut);
        this.options.timeOut = this.options.extendedTimeOut;
        this.hideTime = (/* @__PURE__ */ new Date()).getTime() + (this.options.timeOut || 0);
        this.width.set(-1);
        if (this.options.progressBar) {
          this.intervalId = setInterval(() => this.updateProgress(), 10);
        }
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastNoAnimation, deps: [{ token: ToastrService }, { token: ToastPackage }, { token: ApplicationRef }], target: FactoryTarget.Component });
      static \u0275cmp = \u0275\u0275ngDeclareComponent({ minVersion: "14.0.0", version: "18.0.0", type: _ToastNoAnimation, isStandalone: true, selector: "[toast-component]", host: { listeners: { "click": "tapToast()", "mouseenter": "stickAround()", "mouseleave": "delayedHideToast()" }, properties: { "class": "this.toastClasses", "style.display": "this.displayStyle" } }, ngImport: core_exports, template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width() + '%'"></div>
  </div>
  `, isInline: true, dependencies: [{ kind: "directive", type: NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], changeDetection: ChangeDetectionStrategy.OnPush });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: ToastNoAnimation, decorators: [{
      type: Component,
      args: [{
        selector: "[toast-component]",
        template: `
  <button *ngIf="options.closeButton" (click)="remove()" type="button" class="toast-close-button" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
  <div *ngIf="title" [class]="options.titleClass" [attr.aria-label]="title">
    {{ title }} <ng-container *ngIf="duplicatesCount">[{{ duplicatesCount + 1 }}]</ng-container>
  </div>
  <div *ngIf="message && options.enableHtml" role="alert"
    [class]="options.messageClass" [innerHTML]="message">
  </div>
  <div *ngIf="message && !options.enableHtml" role="alert"
    [class]="options.messageClass" [attr.aria-label]="message">
    {{ message }}
  </div>
  <div *ngIf="options.progressBar">
    <div class="toast-progress" [style.width]="width() + '%'"></div>
  </div>
  `,
        standalone: true,
        imports: [NgIf],
        changeDetection: ChangeDetectionStrategy.OnPush
      }]
    }], ctorParameters: () => [{ type: ToastrService }, { type: ToastPackage }, { type: ApplicationRef }], propDecorators: { toastClasses: [{
      type: HostBinding,
      args: ["class"]
    }], displayStyle: [{
      type: HostBinding,
      args: ["style.display"]
    }], tapToast: [{
      type: HostListener,
      args: ["click"]
    }], stickAround: [{
      type: HostListener,
      args: ["mouseenter"]
    }], delayedHideToast: [{
      type: HostListener,
      args: ["mouseleave"]
    }] } });
    DefaultNoAnimationsGlobalConfig = __spreadProps(__spreadValues({}, DefaultNoComponentGlobalConfig), {
      toastComponent: ToastNoAnimation
    });
    ToastNoAnimationModule = class _ToastNoAnimationModule {
      static forRoot(config = {}) {
        return {
          ngModule: _ToastNoAnimationModule,
          providers: [
            {
              provide: TOAST_CONFIG,
              useValue: {
                default: DefaultNoAnimationsGlobalConfig,
                config
              }
            }
          ]
        };
      }
      static \u0275fac = \u0275\u0275ngDeclareFactory({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastNoAnimationModule, deps: [], target: FactoryTarget.NgModule });
      static \u0275mod = \u0275\u0275ngDeclareNgModule({ minVersion: "14.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastNoAnimationModule, imports: [ToastNoAnimation], exports: [ToastNoAnimation] });
      static \u0275inj = \u0275\u0275ngDeclareInjector({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: _ToastNoAnimationModule });
    };
    \u0275\u0275ngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.0.0", ngImport: core_exports, type: ToastNoAnimationModule, decorators: [{
      type: NgModule,
      args: [{
        imports: [ToastNoAnimation],
        exports: [ToastNoAnimation]
      }]
    }] });
  }
});

// src/app/services/booking.service.ts
var BookingService;
var init_booking_service = __esm({
  "src/app/services/booking.service.ts"() {
    "use strict";
    init_tslib_es6();
    init_core();
    init_common();
    init_esm();
    init_http();
    init_environment();
    init_ngx_toastr();
    BookingService = class BookingService2 {
      http;
      toastr;
      platformId;
      baseUrl = environment.baseUrl;
      // Signal: carries checkout context from EventDetail → Checkout → Success
      selectedEventData = signal(this.getInitialCheckoutData());
      selectedEventData$ = this.selectedEventData.asReadonly();
      // Cache events to eliminate loading flash on return
      eventsCache = [];
      bookingData = new BehaviorSubject({
        event: null,
        selectedTicketType: "General",
        quantity: 1,
        customerInfo: { fullName: "", email: "", phone: "" },
        billingAddress: { street: "", city: "", state: "", zip: "" }
      });
      booking$ = this.bookingData.asObservable();
      constructor(http, toastr, platformId) {
        this.http = http;
        this.toastr = toastr;
        this.platformId = platformId;
      }
      getInitialCheckoutData() {
        if (typeof window !== "undefined" && window.localStorage) {
          try {
            const stored = localStorage.getItem("activeCheckoutData");
            return stored ? JSON.parse(stored) : {};
          } catch {
            return {};
          }
        }
        return {};
      }
      // ── State mutations ─────────────────────────────────────────────────────
      updateCheckoutData(newCheckoutData) {
        this.selectedEventData.set(newCheckoutData);
        if (isPlatformBrowser(this.platformId) && newCheckoutData) {
          try {
            localStorage.setItem("activeCheckoutData", JSON.stringify(newCheckoutData));
          } catch (e) {
            console.warn("Could not cache checkout data to localStorage", e);
          }
        }
      }
      clearCheckoutData() {
        this.selectedEventData.set({});
        if (isPlatformBrowser(this.platformId)) {
          localStorage.removeItem("activeCheckoutData");
          localStorage.removeItem("paymentReference");
        }
      }
      updateBookingConfirmation(data) {
        const current = this.bookingData.value;
        this.bookingData.next(__spreadValues(__spreadValues({}, current), data));
      }
      updateBooking(updates) {
        const current = this.bookingData.value;
        this.bookingData.next(__spreadValues(__spreadValues({}, current), updates));
      }
      getCurrentBooking() {
        return this.bookingData.value;
      }
      // ── API calls ───────────────────────────────────────────────────────────
      getEvents() {
        return this.http.get(`${this.baseUrl}/events`);
      }
      getCachedEvents() {
        return this.eventsCache.length > 0 ? this.eventsCache : null;
      }
      setCachedEvents(events) {
        this.eventsCache = events;
      }
      getEventById(id) {
        return this.http.get(`${this.baseUrl}/events/${id}`);
      }
      submitBooking(bookingData) {
        return this.http.post(`${this.baseUrl}/bookings`, bookingData);
      }
      initializePayment(paymentRequest) {
        return this.http.post(`${this.baseUrl}/checkout/initialize`, paymentRequest);
      }
      verifyPayment(req) {
        return this.http.post(`${this.baseUrl}/checkout/verify`, req);
      }
      // ── Helpers ─────────────────────────────────────────────────────────────
      formatEventDate(dateString) {
        if (!dateString)
          return "";
        const date = new Date(dateString);
        const options = {
          weekday: "short",
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        };
        return date.toLocaleDateString("en-US", options).replace(",", " \xB7");
      }
      handleApiError(err) {
        this.toastr.error(err?.error?.message || err?.error?.status || "Server error \u2014 please try again.", "Notice");
      }
      static ctorParameters = () => [
        { type: HttpClient },
        { type: ToastrService },
        { type: Object, decorators: [{ type: Inject, args: [PLATFORM_ID] }] }
      ];
    };
    BookingService = __decorate([
      Injectable({
        providedIn: "root"
      })
    ], BookingService);
  }
});

// src/app/landing-page/landing-page.ts
var LandingPage;
var init_landing_page3 = __esm({
  "src/app/landing-page/landing-page.ts"() {
    "use strict";
    init_tslib_es6();
    init_landing_page();
    init_landing_page2();
    init_core();
    init_common();
    init_router();
    init_booking_service();
    init_ngx_toastr();
    LandingPage = class LandingPage2 {
      bookingService;
      router;
      toastr;
      events = [];
      loading = false;
      currentYear = (/* @__PURE__ */ new Date()).getFullYear();
      constructor(bookingService, router, toastr) {
        this.bookingService = bookingService;
        this.router = router;
        this.toastr = toastr;
      }
      ngOnInit() {
        const cached = this.bookingService.getCachedEvents();
        if (cached && cached.length > 0) {
          this.events = cached;
          return;
        }
        this.getEvents();
      }
      getEvents() {
        this.loading = true;
        this.bookingService.getEvents().subscribe({
          next: (res) => {
            this.events = res || [];
            this.bookingService.setCachedEvents(this.events);
            this.loading = false;
            if (this.events.length === 0) {
              this.toastr.info("No events at the moment \u2014 check back soon!");
            }
          },
          error: (err) => {
            this.loading = false;
            this.events = [];
            this.bookingService.handleApiError(err);
          }
        });
      }
      isMatchEvent(event) {
        const text = (event.name + " " + (event.venue || "")).toLowerCase();
        return text.includes("bayern") || text.includes("ajax") || text.includes("talanta") || text.includes("vs");
      }
      formatEventDate(dateString) {
        const date = new Date(dateString);
        const options = {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "2-digit",
          hour12: true
        };
        return date.toLocaleDateString("en-US", options).replace(",", " \xB7");
      }
      getEventGradient(index) {
        const gradients = [
          "linear-gradient(135deg,#0f172a,#1e3a8a)",
          "linear-gradient(135deg,#1e1b4b,#312e81)",
          "linear-gradient(135deg,#1e293b,#0f172a)"
        ];
        return gradients[index % gradients.length];
      }
      getEventEmoji(index) {
        const emojis = ["\u26BD", "\u{1F3DF}\uFE0F", "\u{1F39F}\uFE0F", "\u{1F3C6}"];
        return emojis[index % emojis.length];
      }
      getTickets(event) {
        this.router.navigate(["/event", event.id], { state: { eventData: event } });
      }
      static ctorParameters = () => [
        { type: BookingService },
        { type: Router },
        { type: ToastrService }
      ];
    };
    LandingPage = __decorate([
      Component({
        selector: "app-landing-page",
        standalone: true,
        imports: [CommonModule],
        template: landing_page_default,
        styles: [landing_page_default2]
      })
    ], LandingPage);
  }
});

// src/app/landing-page/landing-page.spec.ts
var require_landing_page_spec = __commonJS({
  "src/app/landing-page/landing-page.spec.ts"(exports) {
    init_testing();
    init_landing_page3();
    init_core();
    init_http();
    init_ngx_toastr();
    describe("LandingPage", () => {
      let component;
      let fixture;
      beforeEach(() => __async(null, null, function* () {
        yield TestBed.configureTestingModule({
          imports: [LandingPage],
          providers: [provideZonelessChangeDetection(), provideHttpClient(), provideToastr()]
        }).compileComponents();
        fixture = TestBed.createComponent(LandingPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
      }));
      it("should create", () => {
        expect(component).toBeTruthy();
      });
    });
  }
});
export default require_landing_page_spec();
/*! Bundled license information:

@angular/animations/fesm2022/private_export.mjs:
@angular/animations/fesm2022/animations.mjs:
  (**
   * @license Angular v20.3.32
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=spec-landing-page.spec.js.map
