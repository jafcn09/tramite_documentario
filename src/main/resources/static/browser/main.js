import {
  AUTO_STYLE,
  AnimationGroupPlayer,
  AnimationMetadataType,
  NoopAnimationPlayer,
  sequence,
  style,
  ɵPRE_STYLE
} from "./chunk-KYM3LYO5.js";
import {
  ToastService
} from "./chunk-NXAITARR.js";
import {
  ActivatedRoute,
  AuthService,
  BrowserModule,
  DomRendererFactory2,
  DomSanitizer,
  NavigationEnd,
  Router,
  RouterOutlet,
  bootstrapApplication,
  provideRouter
} from "./chunk-HNI5KL6U.js";
import {
  CheckboxControlValueAccessor,
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MaxLengthValidator,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  NgSelectOption,
  PatternValidator,
  ReactiveFormsModule,
  RequiredValidator,
  SelectControlValueAccessor,
  Validators,
  ɵNgNoValidate,
  ɵNgSelectMultipleOption
} from "./chunk-T3F2XNQR.js";
import {
  ANIMATION_MODULE_TYPE,
  BehaviorSubject,
  ChangeDetectionScheduler,
  CommonModule,
  DOCUMENT,
  DatePipe,
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  Inject,
  Injectable,
  NgClass,
  NgForOf,
  NgIf,
  NgModule,
  NgZone,
  RendererFactory2,
  RuntimeError,
  Subject,
  TimeoutError,
  __objRest,
  __spreadValues,
  catchError,
  debounceTime,
  distinctUntilChanged,
  environment,
  filter,
  inject,
  map,
  of,
  performanceMarkFeature,
  provideHttpClient,
  setClassMetadata,
  switchMap,
  take,
  throwError,
  withInterceptorsFromDi,
  ɵsetClassDebugInfo,
  ɵɵStandaloneFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction3,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeResourceUrl,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtrustConstantResourceUrl,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-VDZBNFIH.js";

// node_modules/@angular/animations/fesm2022/browser.mjs
var LINE_START = "\n - ";
function invalidTimingValue(exp) {
  return new RuntimeError(3e3, ngDevMode && `The provided timing value "${exp}" is invalid.`);
}
function negativeStepValue() {
  return new RuntimeError(3100, ngDevMode && "Duration values below 0 are not allowed for this animation step.");
}
function negativeDelayValue() {
  return new RuntimeError(3101, ngDevMode && "Delay values below 0 are not allowed for this animation step.");
}
function invalidStyleParams(varName) {
  return new RuntimeError(3001, ngDevMode && `Unable to resolve the local animation param ${varName} in the given list of values`);
}
function invalidParamValue(varName) {
  return new RuntimeError(3003, ngDevMode && `Please provide a value for the animation param ${varName}`);
}
function invalidNodeType(nodeType) {
  return new RuntimeError(3004, ngDevMode && `Unable to resolve animation metadata node #${nodeType}`);
}
function invalidCssUnitValue(userProvidedProperty, value) {
  return new RuntimeError(3005, ngDevMode && `Please provide a CSS unit value for ${userProvidedProperty}:${value}`);
}
function invalidTrigger() {
  return new RuntimeError(3006, ngDevMode && "animation triggers cannot be prefixed with an `@` sign (e.g. trigger('@foo', [...]))");
}
function invalidDefinition() {
  return new RuntimeError(3007, ngDevMode && "only state() and transition() definitions can sit inside of a trigger()");
}
function invalidState(metadataName, missingSubs) {
  return new RuntimeError(3008, ngDevMode && `state("${metadataName}", ...) must define default values for all the following style substitutions: ${missingSubs.join(", ")}`);
}
function invalidStyleValue(value) {
  return new RuntimeError(3002, ngDevMode && `The provided style string value ${value} is not allowed.`);
}
function invalidParallelAnimation(prop, firstStart, firstEnd, secondStart, secondEnd) {
  return new RuntimeError(3010, ngDevMode && `The CSS property "${prop}" that exists between the times of "${firstStart}ms" and "${firstEnd}ms" is also being animated in a parallel animation between the times of "${secondStart}ms" and "${secondEnd}ms"`);
}
function invalidKeyframes() {
  return new RuntimeError(3011, ngDevMode && `keyframes() must be placed inside of a call to animate()`);
}
function invalidOffset() {
  return new RuntimeError(3012, ngDevMode && `Please ensure that all keyframe offsets are between 0 and 1`);
}
function keyframeOffsetsOutOfOrder() {
  return new RuntimeError(3200, ngDevMode && `Please ensure that all keyframe offsets are in order`);
}
function keyframesMissingOffsets() {
  return new RuntimeError(3202, ngDevMode && `Not all style() steps within the declared keyframes() contain offsets`);
}
function invalidStagger() {
  return new RuntimeError(3013, ngDevMode && `stagger() can only be used inside of query()`);
}
function invalidQuery(selector) {
  return new RuntimeError(3014, ngDevMode && `\`query("${selector}")\` returned zero elements. (Use \`query("${selector}", { optional: true })\` if you wish to allow this.)`);
}
function invalidExpression(expr) {
  return new RuntimeError(3015, ngDevMode && `The provided transition expression "${expr}" is not supported`);
}
function invalidTransitionAlias(alias) {
  return new RuntimeError(3016, ngDevMode && `The transition alias value "${alias}" is not supported`);
}
function triggerBuildFailed(name, errors) {
  return new RuntimeError(3404, ngDevMode && `The animation trigger "${name}" has failed to build due to the following errors:
 - ${errors.map((err) => err.message).join("\n - ")}`);
}
function animationFailed(errors) {
  return new RuntimeError(3502, ngDevMode && `Unable to animate due to the following errors:${LINE_START}${errors.map((err) => err.message).join(LINE_START)}`);
}
function registerFailed(errors) {
  return new RuntimeError(3503, ngDevMode && `Unable to build the animation due to the following errors: ${errors.map((err) => err.message).join("\n")}`);
}
function missingOrDestroyedAnimation() {
  return new RuntimeError(3300, ngDevMode && "The requested animation doesn't exist or has already been destroyed");
}
function createAnimationFailed(errors) {
  return new RuntimeError(3504, ngDevMode && `Unable to create the animation due to the following errors:${errors.map((err) => err.message).join("\n")}`);
}
function missingPlayer(id) {
  return new RuntimeError(3301, ngDevMode && `Unable to find the timeline player referenced by ${id}`);
}
function missingTrigger(phase, name) {
  return new RuntimeError(3302, ngDevMode && `Unable to listen on the animation trigger event "${phase}" because the animation trigger "${name}" doesn't exist!`);
}
function missingEvent(name) {
  return new RuntimeError(3303, ngDevMode && `Unable to listen on the animation trigger "${name}" because the provided event is undefined!`);
}
function unsupportedTriggerEvent(phase, name) {
  return new RuntimeError(3400, ngDevMode && `The provided animation trigger event "${phase}" for the animation trigger "${name}" is not supported!`);
}
function unregisteredTrigger(name) {
  return new RuntimeError(3401, ngDevMode && `The provided animation trigger "${name}" has not been registered!`);
}
function triggerTransitionsFailed(errors) {
  return new RuntimeError(3402, ngDevMode && `Unable to process animations due to the following failed trigger transitions
 ${errors.map((err) => err.message).join("\n")}`);
}
function transitionFailed(name, errors) {
  return new RuntimeError(3505, ngDevMode && `@${name} has failed due to:
 ${errors.map((err) => err.message).join("\n- ")}`);
}
var ANIMATABLE_PROP_SET = /* @__PURE__ */ new Set(["-moz-outline-radius", "-moz-outline-radius-bottomleft", "-moz-outline-radius-bottomright", "-moz-outline-radius-topleft", "-moz-outline-radius-topright", "-ms-grid-columns", "-ms-grid-rows", "-webkit-line-clamp", "-webkit-text-fill-color", "-webkit-text-stroke", "-webkit-text-stroke-color", "accent-color", "all", "backdrop-filter", "background", "background-color", "background-position", "background-size", "block-size", "border", "border-block-end", "border-block-end-color", "border-block-end-width", "border-block-start", "border-block-start-color", "border-block-start-width", "border-bottom", "border-bottom-color", "border-bottom-left-radius", "border-bottom-right-radius", "border-bottom-width", "border-color", "border-end-end-radius", "border-end-start-radius", "border-image-outset", "border-image-slice", "border-image-width", "border-inline-end", "border-inline-end-color", "border-inline-end-width", "border-inline-start", "border-inline-start-color", "border-inline-start-width", "border-left", "border-left-color", "border-left-width", "border-radius", "border-right", "border-right-color", "border-right-width", "border-start-end-radius", "border-start-start-radius", "border-top", "border-top-color", "border-top-left-radius", "border-top-right-radius", "border-top-width", "border-width", "bottom", "box-shadow", "caret-color", "clip", "clip-path", "color", "column-count", "column-gap", "column-rule", "column-rule-color", "column-rule-width", "column-width", "columns", "filter", "flex", "flex-basis", "flex-grow", "flex-shrink", "font", "font-size", "font-size-adjust", "font-stretch", "font-variation-settings", "font-weight", "gap", "grid-column-gap", "grid-gap", "grid-row-gap", "grid-template-columns", "grid-template-rows", "height", "inline-size", "input-security", "inset", "inset-block", "inset-block-end", "inset-block-start", "inset-inline", "inset-inline-end", "inset-inline-start", "left", "letter-spacing", "line-clamp", "line-height", "margin", "margin-block-end", "margin-block-start", "margin-bottom", "margin-inline-end", "margin-inline-start", "margin-left", "margin-right", "margin-top", "mask", "mask-border", "mask-position", "mask-size", "max-block-size", "max-height", "max-inline-size", "max-lines", "max-width", "min-block-size", "min-height", "min-inline-size", "min-width", "object-position", "offset", "offset-anchor", "offset-distance", "offset-path", "offset-position", "offset-rotate", "opacity", "order", "outline", "outline-color", "outline-offset", "outline-width", "padding", "padding-block-end", "padding-block-start", "padding-bottom", "padding-inline-end", "padding-inline-start", "padding-left", "padding-right", "padding-top", "perspective", "perspective-origin", "right", "rotate", "row-gap", "scale", "scroll-margin", "scroll-margin-block", "scroll-margin-block-end", "scroll-margin-block-start", "scroll-margin-bottom", "scroll-margin-inline", "scroll-margin-inline-end", "scroll-margin-inline-start", "scroll-margin-left", "scroll-margin-right", "scroll-margin-top", "scroll-padding", "scroll-padding-block", "scroll-padding-block-end", "scroll-padding-block-start", "scroll-padding-bottom", "scroll-padding-inline", "scroll-padding-inline-end", "scroll-padding-inline-start", "scroll-padding-left", "scroll-padding-right", "scroll-padding-top", "scroll-snap-coordinate", "scroll-snap-destination", "scrollbar-color", "shape-image-threshold", "shape-margin", "shape-outside", "tab-size", "text-decoration", "text-decoration-color", "text-decoration-thickness", "text-emphasis", "text-emphasis-color", "text-indent", "text-shadow", "text-underline-offset", "top", "transform", "transform-origin", "translate", "vertical-align", "visibility", "width", "word-spacing", "z-index", "zoom"]);
function optimizeGroupPlayer(players) {
  switch (players.length) {
    case 0:
      return new NoopAnimationPlayer();
    case 1:
      return players[0];
    default:
      return new AnimationGroupPlayer(players);
  }
}
function normalizeKeyframes$1(normalizer, keyframes, preStyles = /* @__PURE__ */ new Map(), postStyles = /* @__PURE__ */ new Map()) {
  const errors = [];
  const normalizedKeyframes = [];
  let previousOffset = -1;
  let previousKeyframe = null;
  keyframes.forEach((kf) => {
    const offset = kf.get("offset");
    const isSameOffset = offset == previousOffset;
    const normalizedKeyframe = isSameOffset && previousKeyframe || /* @__PURE__ */ new Map();
    kf.forEach((val, prop) => {
      let normalizedProp = prop;
      let normalizedValue = val;
      if (prop !== "offset") {
        normalizedProp = normalizer.normalizePropertyName(normalizedProp, errors);
        switch (normalizedValue) {
          case \u0275PRE_STYLE:
            normalizedValue = preStyles.get(prop);
            break;
          case AUTO_STYLE:
            normalizedValue = postStyles.get(prop);
            break;
          default:
            normalizedValue = normalizer.normalizeStyleValue(prop, normalizedProp, normalizedValue, errors);
            break;
        }
      }
      normalizedKeyframe.set(normalizedProp, normalizedValue);
    });
    if (!isSameOffset) {
      normalizedKeyframes.push(normalizedKeyframe);
    }
    previousKeyframe = normalizedKeyframe;
    previousOffset = offset;
  });
  if (errors.length) {
    throw animationFailed(errors);
  }
  return normalizedKeyframes;
}
function listenOnPlayer(player, eventName, event, callback) {
  switch (eventName) {
    case "start":
      player.onStart(() => callback(event && copyAnimationEvent(event, "start", player)));
      break;
    case "done":
      player.onDone(() => callback(event && copyAnimationEvent(event, "done", player)));
      break;
    case "destroy":
      player.onDestroy(() => callback(event && copyAnimationEvent(event, "destroy", player)));
      break;
  }
}
function copyAnimationEvent(e, phaseName, player) {
  const totalTime = player.totalTime;
  const disabled = player.disabled ? true : false;
  const event = makeAnimationEvent(e.element, e.triggerName, e.fromState, e.toState, phaseName || e.phaseName, totalTime == void 0 ? e.totalTime : totalTime, disabled);
  const data = e["_data"];
  if (data != null) {
    event["_data"] = data;
  }
  return event;
}
function makeAnimationEvent(element, triggerName, fromState, toState, phaseName = "", totalTime = 0, disabled) {
  return {
    element,
    triggerName,
    fromState,
    toState,
    phaseName,
    totalTime,
    disabled: !!disabled
  };
}
function getOrSetDefaultValue(map2, key, defaultValue) {
  let value = map2.get(key);
  if (!value) {
    map2.set(key, value = defaultValue);
  }
  return value;
}
function parseTimelineCommand(command) {
  const separatorPos = command.indexOf(":");
  const id = command.substring(1, separatorPos);
  const action = command.slice(separatorPos + 1);
  return [id, action];
}
var documentElement = /* @__PURE__ */ (() => typeof document === "undefined" ? null : document.documentElement)();
function getParentElement(element) {
  const parent = element.parentNode || element.host || null;
  if (parent === documentElement) {
    return null;
  }
  return parent;
}
function containsVendorPrefix(prop) {
  return prop.substring(1, 6) == "ebkit";
}
var _CACHED_BODY = null;
var _IS_WEBKIT = false;
function validateStyleProperty(prop) {
  if (!_CACHED_BODY) {
    _CACHED_BODY = getBodyNode() || {};
    _IS_WEBKIT = _CACHED_BODY.style ? "WebkitAppearance" in _CACHED_BODY.style : false;
  }
  let result = true;
  if (_CACHED_BODY.style && !containsVendorPrefix(prop)) {
    result = prop in _CACHED_BODY.style;
    if (!result && _IS_WEBKIT) {
      const camelProp = "Webkit" + prop.charAt(0).toUpperCase() + prop.slice(1);
      result = camelProp in _CACHED_BODY.style;
    }
  }
  return result;
}
function validateWebAnimatableStyleProperty(prop) {
  return ANIMATABLE_PROP_SET.has(prop);
}
function getBodyNode() {
  if (typeof document != "undefined") {
    return document.body;
  }
  return null;
}
function containsElement(elm1, elm2) {
  while (elm2) {
    if (elm2 === elm1) {
      return true;
    }
    elm2 = getParentElement(elm2);
  }
  return false;
}
function invokeQuery(element, selector, multi) {
  if (multi) {
    return Array.from(element.querySelectorAll(selector));
  }
  const elem = element.querySelector(selector);
  return elem ? [elem] : [];
}
var NoopAnimationDriver = class _NoopAnimationDriver {
  /**
   * @returns Whether `prop` is a valid CSS property
   */
  validateStyleProperty(prop) {
    return validateStyleProperty(prop);
  }
  /**
   * @deprecated unused
   */
  matchesElement(_element, _selector) {
    return false;
  }
  /**
   *
   * @returns Whether elm1 contains elm2.
   */
  containsElement(elm1, elm2) {
    return containsElement(elm1, elm2);
  }
  /**
   * @returns Rhe parent of the given element or `null` if the element is the `document`
   */
  getParentElement(element) {
    return getParentElement(element);
  }
  /**
   * @returns The result of the query selector on the element. The array will contain up to 1 item
   *     if `multi` is  `false`.
   */
  query(element, selector, multi) {
    return invokeQuery(element, selector, multi);
  }
  /**
   * @returns The `defaultValue` or empty string
   */
  computeStyle(element, prop, defaultValue) {
    return defaultValue || "";
  }
  /**
   * @returns An `NoopAnimationPlayer`
   */
  animate(element, keyframes, duration, delay, easing, previousPlayers = [], scrubberAccessRequested) {
    return new NoopAnimationPlayer(duration, delay);
  }
  static {
    this.\u0275fac = function NoopAnimationDriver_Factory(t) {
      return new (t || _NoopAnimationDriver)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _NoopAnimationDriver,
      factory: _NoopAnimationDriver.\u0275fac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopAnimationDriver, [{
    type: Injectable
  }], null, null);
})();
var AnimationDriver = class {
  static {
    this.NOOP = new NoopAnimationDriver();
  }
};
var AnimationStyleNormalizer = class {
};
var ONE_SECOND = 1e3;
var SUBSTITUTION_EXPR_START = "{{";
var SUBSTITUTION_EXPR_END = "}}";
var ENTER_CLASSNAME = "ng-enter";
var LEAVE_CLASSNAME = "ng-leave";
var NG_TRIGGER_CLASSNAME = "ng-trigger";
var NG_TRIGGER_SELECTOR = ".ng-trigger";
var NG_ANIMATING_CLASSNAME = "ng-animating";
var NG_ANIMATING_SELECTOR = ".ng-animating";
function resolveTimingValue(value) {
  if (typeof value == "number")
    return value;
  const matches = value.match(/^(-?[\.\d]+)(m?s)/);
  if (!matches || matches.length < 2)
    return 0;
  return _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
}
function _convertTimeValueToMS(value, unit) {
  switch (unit) {
    case "s":
      return value * ONE_SECOND;
    default:
      return value;
  }
}
function resolveTiming(timings, errors, allowNegativeValues) {
  return timings.hasOwnProperty("duration") ? timings : parseTimeExpression(timings, errors, allowNegativeValues);
}
function parseTimeExpression(exp, errors, allowNegativeValues) {
  const regex = /^(-?[\.\d]+)(m?s)(?:\s+(-?[\.\d]+)(m?s))?(?:\s+([-a-z]+(?:\(.+?\))?))?$/i;
  let duration;
  let delay = 0;
  let easing = "";
  if (typeof exp === "string") {
    const matches = exp.match(regex);
    if (matches === null) {
      errors.push(invalidTimingValue(exp));
      return {
        duration: 0,
        delay: 0,
        easing: ""
      };
    }
    duration = _convertTimeValueToMS(parseFloat(matches[1]), matches[2]);
    const delayMatch = matches[3];
    if (delayMatch != null) {
      delay = _convertTimeValueToMS(parseFloat(delayMatch), matches[4]);
    }
    const easingVal = matches[5];
    if (easingVal) {
      easing = easingVal;
    }
  } else {
    duration = exp;
  }
  if (!allowNegativeValues) {
    let containsErrors = false;
    let startIndex = errors.length;
    if (duration < 0) {
      errors.push(negativeStepValue());
      containsErrors = true;
    }
    if (delay < 0) {
      errors.push(negativeDelayValue());
      containsErrors = true;
    }
    if (containsErrors) {
      errors.splice(startIndex, 0, invalidTimingValue(exp));
    }
  }
  return {
    duration,
    delay,
    easing
  };
}
function normalizeKeyframes(keyframes) {
  if (!keyframes.length) {
    return [];
  }
  if (keyframes[0] instanceof Map) {
    return keyframes;
  }
  return keyframes.map((kf) => new Map(Object.entries(kf)));
}
function setStyles(element, styles, formerStyles) {
  styles.forEach((val, prop) => {
    const camelProp = dashCaseToCamelCase(prop);
    if (formerStyles && !formerStyles.has(prop)) {
      formerStyles.set(prop, element.style[camelProp]);
    }
    element.style[camelProp] = val;
  });
}
function eraseStyles(element, styles) {
  styles.forEach((_, prop) => {
    const camelProp = dashCaseToCamelCase(prop);
    element.style[camelProp] = "";
  });
}
function normalizeAnimationEntry(steps) {
  if (Array.isArray(steps)) {
    if (steps.length == 1)
      return steps[0];
    return sequence(steps);
  }
  return steps;
}
function validateStyleParams(value, options, errors) {
  const params = options.params || {};
  const matches = extractStyleParams(value);
  if (matches.length) {
    matches.forEach((varName) => {
      if (!params.hasOwnProperty(varName)) {
        errors.push(invalidStyleParams(varName));
      }
    });
  }
}
var PARAM_REGEX = new RegExp(`${SUBSTITUTION_EXPR_START}\\s*(.+?)\\s*${SUBSTITUTION_EXPR_END}`, "g");
function extractStyleParams(value) {
  let params = [];
  if (typeof value === "string") {
    let match;
    while (match = PARAM_REGEX.exec(value)) {
      params.push(match[1]);
    }
    PARAM_REGEX.lastIndex = 0;
  }
  return params;
}
function interpolateParams(value, params, errors) {
  const original = `${value}`;
  const str = original.replace(PARAM_REGEX, (_, varName) => {
    let localVal = params[varName];
    if (localVal == null) {
      errors.push(invalidParamValue(varName));
      localVal = "";
    }
    return localVal.toString();
  });
  return str == original ? value : str;
}
var DASH_CASE_REGEXP = /-+([a-z0-9])/g;
function dashCaseToCamelCase(input) {
  return input.replace(DASH_CASE_REGEXP, (...m) => m[1].toUpperCase());
}
function camelCaseToDashCase(input) {
  return input.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function allowPreviousPlayerStylesMerge(duration, delay) {
  return duration === 0 || delay === 0;
}
function balancePreviousStylesIntoKeyframes(element, keyframes, previousStyles) {
  if (previousStyles.size && keyframes.length) {
    let startingKeyframe = keyframes[0];
    let missingStyleProps = [];
    previousStyles.forEach((val, prop) => {
      if (!startingKeyframe.has(prop)) {
        missingStyleProps.push(prop);
      }
      startingKeyframe.set(prop, val);
    });
    if (missingStyleProps.length) {
      for (let i = 1; i < keyframes.length; i++) {
        let kf = keyframes[i];
        missingStyleProps.forEach((prop) => kf.set(prop, computeStyle(element, prop)));
      }
    }
  }
  return keyframes;
}
function visitDslNode(visitor, node, context) {
  switch (node.type) {
    case AnimationMetadataType.Trigger:
      return visitor.visitTrigger(node, context);
    case AnimationMetadataType.State:
      return visitor.visitState(node, context);
    case AnimationMetadataType.Transition:
      return visitor.visitTransition(node, context);
    case AnimationMetadataType.Sequence:
      return visitor.visitSequence(node, context);
    case AnimationMetadataType.Group:
      return visitor.visitGroup(node, context);
    case AnimationMetadataType.Animate:
      return visitor.visitAnimate(node, context);
    case AnimationMetadataType.Keyframes:
      return visitor.visitKeyframes(node, context);
    case AnimationMetadataType.Style:
      return visitor.visitStyle(node, context);
    case AnimationMetadataType.Reference:
      return visitor.visitReference(node, context);
    case AnimationMetadataType.AnimateChild:
      return visitor.visitAnimateChild(node, context);
    case AnimationMetadataType.AnimateRef:
      return visitor.visitAnimateRef(node, context);
    case AnimationMetadataType.Query:
      return visitor.visitQuery(node, context);
    case AnimationMetadataType.Stagger:
      return visitor.visitStagger(node, context);
    default:
      throw invalidNodeType(node.type);
  }
}
function computeStyle(element, prop) {
  return window.getComputedStyle(element)[prop];
}
var DIMENSIONAL_PROP_SET = /* @__PURE__ */ new Set(["width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight", "left", "top", "bottom", "right", "fontSize", "outlineWidth", "outlineOffset", "paddingTop", "paddingLeft", "paddingBottom", "paddingRight", "marginTop", "marginLeft", "marginBottom", "marginRight", "borderRadius", "borderWidth", "borderTopWidth", "borderLeftWidth", "borderRightWidth", "borderBottomWidth", "textIndent", "perspective"]);
var WebAnimationsStyleNormalizer = class extends AnimationStyleNormalizer {
  normalizePropertyName(propertyName, errors) {
    return dashCaseToCamelCase(propertyName);
  }
  normalizeStyleValue(userProvidedProperty, normalizedProperty, value, errors) {
    let unit = "";
    const strVal = value.toString().trim();
    if (DIMENSIONAL_PROP_SET.has(normalizedProperty) && value !== 0 && value !== "0") {
      if (typeof value === "number") {
        unit = "px";
      } else {
        const valAndSuffixMatch = value.match(/^[+-]?[\d\.]+([a-z]*)$/);
        if (valAndSuffixMatch && valAndSuffixMatch[1].length == 0) {
          errors.push(invalidCssUnitValue(userProvidedProperty, value));
        }
      }
    }
    return strVal + unit;
  }
};
function createListOfWarnings(warnings) {
  const LINE_START2 = "\n - ";
  return `${LINE_START2}${warnings.filter(Boolean).map((warning) => warning).join(LINE_START2)}`;
}
function warnTriggerBuild(name, warnings) {
  (typeof ngDevMode === "undefined" || ngDevMode) && console.warn(`The animation trigger "${name}" has built with the following warnings:${createListOfWarnings(warnings)}`);
}
function warnRegister(warnings) {
  (typeof ngDevMode === "undefined" || ngDevMode) && console.warn(`Animation built with the following warnings:${createListOfWarnings(warnings)}`);
}
function pushUnrecognizedPropertiesWarning(warnings, props) {
  if (props.length) {
    warnings.push(`The following provided properties are not recognized: ${props.join(", ")}`);
  }
}
var ANY_STATE = "*";
function parseTransitionExpr(transitionValue, errors) {
  const expressions = [];
  if (typeof transitionValue == "string") {
    transitionValue.split(/\s*,\s*/).forEach((str) => parseInnerTransitionStr(str, expressions, errors));
  } else {
    expressions.push(transitionValue);
  }
  return expressions;
}
function parseInnerTransitionStr(eventStr, expressions, errors) {
  if (eventStr[0] == ":") {
    const result = parseAnimationAlias(eventStr, errors);
    if (typeof result == "function") {
      expressions.push(result);
      return;
    }
    eventStr = result;
  }
  const match = eventStr.match(/^(\*|[-\w]+)\s*(<?[=-]>)\s*(\*|[-\w]+)$/);
  if (match == null || match.length < 4) {
    errors.push(invalidExpression(eventStr));
    return expressions;
  }
  const fromState = match[1];
  const separator = match[2];
  const toState = match[3];
  expressions.push(makeLambdaFromStates(fromState, toState));
  const isFullAnyStateExpr = fromState == ANY_STATE && toState == ANY_STATE;
  if (separator[0] == "<" && !isFullAnyStateExpr) {
    expressions.push(makeLambdaFromStates(toState, fromState));
  }
  return;
}
function parseAnimationAlias(alias, errors) {
  switch (alias) {
    case ":enter":
      return "void => *";
    case ":leave":
      return "* => void";
    case ":increment":
      return (fromState, toState) => parseFloat(toState) > parseFloat(fromState);
    case ":decrement":
      return (fromState, toState) => parseFloat(toState) < parseFloat(fromState);
    default:
      errors.push(invalidTransitionAlias(alias));
      return "* => *";
  }
}
var TRUE_BOOLEAN_VALUES = /* @__PURE__ */ new Set(["true", "1"]);
var FALSE_BOOLEAN_VALUES = /* @__PURE__ */ new Set(["false", "0"]);
function makeLambdaFromStates(lhs, rhs) {
  const LHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(lhs) || FALSE_BOOLEAN_VALUES.has(lhs);
  const RHS_MATCH_BOOLEAN = TRUE_BOOLEAN_VALUES.has(rhs) || FALSE_BOOLEAN_VALUES.has(rhs);
  return (fromState, toState) => {
    let lhsMatch = lhs == ANY_STATE || lhs == fromState;
    let rhsMatch = rhs == ANY_STATE || rhs == toState;
    if (!lhsMatch && LHS_MATCH_BOOLEAN && typeof fromState === "boolean") {
      lhsMatch = fromState ? TRUE_BOOLEAN_VALUES.has(lhs) : FALSE_BOOLEAN_VALUES.has(lhs);
    }
    if (!rhsMatch && RHS_MATCH_BOOLEAN && typeof toState === "boolean") {
      rhsMatch = toState ? TRUE_BOOLEAN_VALUES.has(rhs) : FALSE_BOOLEAN_VALUES.has(rhs);
    }
    return lhsMatch && rhsMatch;
  };
}
var SELF_TOKEN = ":self";
var SELF_TOKEN_REGEX = new RegExp(`s*${SELF_TOKEN}s*,?`, "g");
function buildAnimationAst(driver, metadata, errors, warnings) {
  return new AnimationAstBuilderVisitor(driver).build(metadata, errors, warnings);
}
var ROOT_SELECTOR = "";
var AnimationAstBuilderVisitor = class {
  constructor(_driver) {
    this._driver = _driver;
  }
  build(metadata, errors, warnings) {
    const context = new AnimationAstBuilderContext(errors);
    this._resetContextStyleTimingState(context);
    const ast = visitDslNode(this, normalizeAnimationEntry(metadata), context);
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      if (context.unsupportedCSSPropertiesFound.size) {
        pushUnrecognizedPropertiesWarning(warnings, [...context.unsupportedCSSPropertiesFound.keys()]);
      }
    }
    return ast;
  }
  _resetContextStyleTimingState(context) {
    context.currentQuerySelector = ROOT_SELECTOR;
    context.collectedStyles = /* @__PURE__ */ new Map();
    context.collectedStyles.set(ROOT_SELECTOR, /* @__PURE__ */ new Map());
    context.currentTime = 0;
  }
  visitTrigger(metadata, context) {
    let queryCount = context.queryCount = 0;
    let depCount = context.depCount = 0;
    const states = [];
    const transitions = [];
    if (metadata.name.charAt(0) == "@") {
      context.errors.push(invalidTrigger());
    }
    metadata.definitions.forEach((def) => {
      this._resetContextStyleTimingState(context);
      if (def.type == AnimationMetadataType.State) {
        const stateDef = def;
        const name = stateDef.name;
        name.toString().split(/\s*,\s*/).forEach((n) => {
          stateDef.name = n;
          states.push(this.visitState(stateDef, context));
        });
        stateDef.name = name;
      } else if (def.type == AnimationMetadataType.Transition) {
        const transition = this.visitTransition(def, context);
        queryCount += transition.queryCount;
        depCount += transition.depCount;
        transitions.push(transition);
      } else {
        context.errors.push(invalidDefinition());
      }
    });
    return {
      type: AnimationMetadataType.Trigger,
      name: metadata.name,
      states,
      transitions,
      queryCount,
      depCount,
      options: null
    };
  }
  visitState(metadata, context) {
    const styleAst = this.visitStyle(metadata.styles, context);
    const astParams = metadata.options && metadata.options.params || null;
    if (styleAst.containsDynamicStyles) {
      const missingSubs = /* @__PURE__ */ new Set();
      const params = astParams || {};
      styleAst.styles.forEach((style2) => {
        if (style2 instanceof Map) {
          style2.forEach((value) => {
            extractStyleParams(value).forEach((sub) => {
              if (!params.hasOwnProperty(sub)) {
                missingSubs.add(sub);
              }
            });
          });
        }
      });
      if (missingSubs.size) {
        context.errors.push(invalidState(metadata.name, [...missingSubs.values()]));
      }
    }
    return {
      type: AnimationMetadataType.State,
      name: metadata.name,
      style: styleAst,
      options: astParams ? {
        params: astParams
      } : null
    };
  }
  visitTransition(metadata, context) {
    context.queryCount = 0;
    context.depCount = 0;
    const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
    const matchers = parseTransitionExpr(metadata.expr, context.errors);
    return {
      type: AnimationMetadataType.Transition,
      matchers,
      animation,
      queryCount: context.queryCount,
      depCount: context.depCount,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitSequence(metadata, context) {
    return {
      type: AnimationMetadataType.Sequence,
      steps: metadata.steps.map((s) => visitDslNode(this, s, context)),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitGroup(metadata, context) {
    const currentTime = context.currentTime;
    let furthestTime = 0;
    const steps = metadata.steps.map((step) => {
      context.currentTime = currentTime;
      const innerAst = visitDslNode(this, step, context);
      furthestTime = Math.max(furthestTime, context.currentTime);
      return innerAst;
    });
    context.currentTime = furthestTime;
    return {
      type: AnimationMetadataType.Group,
      steps,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimate(metadata, context) {
    const timingAst = constructTimingAst(metadata.timings, context.errors);
    context.currentAnimateTimings = timingAst;
    let styleAst;
    let styleMetadata = metadata.styles ? metadata.styles : style({});
    if (styleMetadata.type == AnimationMetadataType.Keyframes) {
      styleAst = this.visitKeyframes(styleMetadata, context);
    } else {
      let styleMetadata2 = metadata.styles;
      let isEmpty = false;
      if (!styleMetadata2) {
        isEmpty = true;
        const newStyleData = {};
        if (timingAst.easing) {
          newStyleData["easing"] = timingAst.easing;
        }
        styleMetadata2 = style(newStyleData);
      }
      context.currentTime += timingAst.duration + timingAst.delay;
      const _styleAst = this.visitStyle(styleMetadata2, context);
      _styleAst.isEmptyStep = isEmpty;
      styleAst = _styleAst;
    }
    context.currentAnimateTimings = null;
    return {
      type: AnimationMetadataType.Animate,
      timings: timingAst,
      style: styleAst,
      options: null
    };
  }
  visitStyle(metadata, context) {
    const ast = this._makeStyleAst(metadata, context);
    this._validateStyleAst(ast, context);
    return ast;
  }
  _makeStyleAst(metadata, context) {
    const styles = [];
    const metadataStyles = Array.isArray(metadata.styles) ? metadata.styles : [metadata.styles];
    for (let styleTuple of metadataStyles) {
      if (typeof styleTuple === "string") {
        if (styleTuple === AUTO_STYLE) {
          styles.push(styleTuple);
        } else {
          context.errors.push(invalidStyleValue(styleTuple));
        }
      } else {
        styles.push(new Map(Object.entries(styleTuple)));
      }
    }
    let containsDynamicStyles = false;
    let collectedEasing = null;
    styles.forEach((styleData) => {
      if (styleData instanceof Map) {
        if (styleData.has("easing")) {
          collectedEasing = styleData.get("easing");
          styleData.delete("easing");
        }
        if (!containsDynamicStyles) {
          for (let value of styleData.values()) {
            if (value.toString().indexOf(SUBSTITUTION_EXPR_START) >= 0) {
              containsDynamicStyles = true;
              break;
            }
          }
        }
      }
    });
    return {
      type: AnimationMetadataType.Style,
      styles,
      easing: collectedEasing,
      offset: metadata.offset,
      containsDynamicStyles,
      options: null
    };
  }
  _validateStyleAst(ast, context) {
    const timings = context.currentAnimateTimings;
    let endTime = context.currentTime;
    let startTime = context.currentTime;
    if (timings && startTime > 0) {
      startTime -= timings.duration + timings.delay;
    }
    ast.styles.forEach((tuple) => {
      if (typeof tuple === "string")
        return;
      tuple.forEach((value, prop) => {
        if (typeof ngDevMode === "undefined" || ngDevMode) {
          if (!this._driver.validateStyleProperty(prop)) {
            tuple.delete(prop);
            context.unsupportedCSSPropertiesFound.add(prop);
            return;
          }
        }
        const collectedStyles = context.collectedStyles.get(context.currentQuerySelector);
        const collectedEntry = collectedStyles.get(prop);
        let updateCollectedStyle = true;
        if (collectedEntry) {
          if (startTime != endTime && startTime >= collectedEntry.startTime && endTime <= collectedEntry.endTime) {
            context.errors.push(invalidParallelAnimation(prop, collectedEntry.startTime, collectedEntry.endTime, startTime, endTime));
            updateCollectedStyle = false;
          }
          startTime = collectedEntry.startTime;
        }
        if (updateCollectedStyle) {
          collectedStyles.set(prop, {
            startTime,
            endTime
          });
        }
        if (context.options) {
          validateStyleParams(value, context.options, context.errors);
        }
      });
    });
  }
  visitKeyframes(metadata, context) {
    const ast = {
      type: AnimationMetadataType.Keyframes,
      styles: [],
      options: null
    };
    if (!context.currentAnimateTimings) {
      context.errors.push(invalidKeyframes());
      return ast;
    }
    const MAX_KEYFRAME_OFFSET = 1;
    let totalKeyframesWithOffsets = 0;
    const offsets = [];
    let offsetsOutOfOrder = false;
    let keyframesOutOfRange = false;
    let previousOffset = 0;
    const keyframes = metadata.steps.map((styles) => {
      const style2 = this._makeStyleAst(styles, context);
      let offsetVal = style2.offset != null ? style2.offset : consumeOffset(style2.styles);
      let offset = 0;
      if (offsetVal != null) {
        totalKeyframesWithOffsets++;
        offset = style2.offset = offsetVal;
      }
      keyframesOutOfRange = keyframesOutOfRange || offset < 0 || offset > 1;
      offsetsOutOfOrder = offsetsOutOfOrder || offset < previousOffset;
      previousOffset = offset;
      offsets.push(offset);
      return style2;
    });
    if (keyframesOutOfRange) {
      context.errors.push(invalidOffset());
    }
    if (offsetsOutOfOrder) {
      context.errors.push(keyframeOffsetsOutOfOrder());
    }
    const length = metadata.steps.length;
    let generatedOffset = 0;
    if (totalKeyframesWithOffsets > 0 && totalKeyframesWithOffsets < length) {
      context.errors.push(keyframesMissingOffsets());
    } else if (totalKeyframesWithOffsets == 0) {
      generatedOffset = MAX_KEYFRAME_OFFSET / (length - 1);
    }
    const limit = length - 1;
    const currentTime = context.currentTime;
    const currentAnimateTimings = context.currentAnimateTimings;
    const animateDuration = currentAnimateTimings.duration;
    keyframes.forEach((kf, i) => {
      const offset = generatedOffset > 0 ? i == limit ? 1 : generatedOffset * i : offsets[i];
      const durationUpToThisFrame = offset * animateDuration;
      context.currentTime = currentTime + currentAnimateTimings.delay + durationUpToThisFrame;
      currentAnimateTimings.duration = durationUpToThisFrame;
      this._validateStyleAst(kf, context);
      kf.offset = offset;
      ast.styles.push(kf);
    });
    return ast;
  }
  visitReference(metadata, context) {
    return {
      type: AnimationMetadataType.Reference,
      animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimateChild(metadata, context) {
    context.depCount++;
    return {
      type: AnimationMetadataType.AnimateChild,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitAnimateRef(metadata, context) {
    return {
      type: AnimationMetadataType.AnimateRef,
      animation: this.visitReference(metadata.animation, context),
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitQuery(metadata, context) {
    const parentSelector = context.currentQuerySelector;
    const options = metadata.options || {};
    context.queryCount++;
    context.currentQuery = metadata;
    const [selector, includeSelf] = normalizeSelector(metadata.selector);
    context.currentQuerySelector = parentSelector.length ? parentSelector + " " + selector : selector;
    getOrSetDefaultValue(context.collectedStyles, context.currentQuerySelector, /* @__PURE__ */ new Map());
    const animation = visitDslNode(this, normalizeAnimationEntry(metadata.animation), context);
    context.currentQuery = null;
    context.currentQuerySelector = parentSelector;
    return {
      type: AnimationMetadataType.Query,
      selector,
      limit: options.limit || 0,
      optional: !!options.optional,
      includeSelf,
      animation,
      originalSelector: metadata.selector,
      options: normalizeAnimationOptions(metadata.options)
    };
  }
  visitStagger(metadata, context) {
    if (!context.currentQuery) {
      context.errors.push(invalidStagger());
    }
    const timings = metadata.timings === "full" ? {
      duration: 0,
      delay: 0,
      easing: "full"
    } : resolveTiming(metadata.timings, context.errors, true);
    return {
      type: AnimationMetadataType.Stagger,
      animation: visitDslNode(this, normalizeAnimationEntry(metadata.animation), context),
      timings,
      options: null
    };
  }
};
function normalizeSelector(selector) {
  const hasAmpersand = selector.split(/\s*,\s*/).find((token) => token == SELF_TOKEN) ? true : false;
  if (hasAmpersand) {
    selector = selector.replace(SELF_TOKEN_REGEX, "");
  }
  selector = selector.replace(/@\*/g, NG_TRIGGER_SELECTOR).replace(/@\w+/g, (match) => NG_TRIGGER_SELECTOR + "-" + match.slice(1)).replace(/:animating/g, NG_ANIMATING_SELECTOR);
  return [selector, hasAmpersand];
}
function normalizeParams(obj) {
  return obj ? __spreadValues({}, obj) : null;
}
var AnimationAstBuilderContext = class {
  constructor(errors) {
    this.errors = errors;
    this.queryCount = 0;
    this.depCount = 0;
    this.currentTransition = null;
    this.currentQuery = null;
    this.currentQuerySelector = null;
    this.currentAnimateTimings = null;
    this.currentTime = 0;
    this.collectedStyles = /* @__PURE__ */ new Map();
    this.options = null;
    this.unsupportedCSSPropertiesFound = /* @__PURE__ */ new Set();
  }
};
function consumeOffset(styles) {
  if (typeof styles == "string")
    return null;
  let offset = null;
  if (Array.isArray(styles)) {
    styles.forEach((styleTuple) => {
      if (styleTuple instanceof Map && styleTuple.has("offset")) {
        const obj = styleTuple;
        offset = parseFloat(obj.get("offset"));
        obj.delete("offset");
      }
    });
  } else if (styles instanceof Map && styles.has("offset")) {
    const obj = styles;
    offset = parseFloat(obj.get("offset"));
    obj.delete("offset");
  }
  return offset;
}
function constructTimingAst(value, errors) {
  if (value.hasOwnProperty("duration")) {
    return value;
  }
  if (typeof value == "number") {
    const duration = resolveTiming(value, errors).duration;
    return makeTimingAst(duration, 0, "");
  }
  const strValue = value;
  const isDynamic = strValue.split(/\s+/).some((v) => v.charAt(0) == "{" && v.charAt(1) == "{");
  if (isDynamic) {
    const ast = makeTimingAst(0, 0, "");
    ast.dynamic = true;
    ast.strValue = strValue;
    return ast;
  }
  const timings = resolveTiming(strValue, errors);
  return makeTimingAst(timings.duration, timings.delay, timings.easing);
}
function normalizeAnimationOptions(options) {
  if (options) {
    options = __spreadValues({}, options);
    if (options["params"]) {
      options["params"] = normalizeParams(options["params"]);
    }
  } else {
    options = {};
  }
  return options;
}
function makeTimingAst(duration, delay, easing) {
  return {
    duration,
    delay,
    easing
  };
}
function createTimelineInstruction(element, keyframes, preStyleProps, postStyleProps, duration, delay, easing = null, subTimeline = false) {
  return {
    type: 1,
    element,
    keyframes,
    preStyleProps,
    postStyleProps,
    duration,
    delay,
    totalTime: duration + delay,
    easing,
    subTimeline
  };
}
var ElementInstructionMap = class {
  constructor() {
    this._map = /* @__PURE__ */ new Map();
  }
  get(element) {
    return this._map.get(element) || [];
  }
  append(element, instructions) {
    let existingInstructions = this._map.get(element);
    if (!existingInstructions) {
      this._map.set(element, existingInstructions = []);
    }
    existingInstructions.push(...instructions);
  }
  has(element) {
    return this._map.has(element);
  }
  clear() {
    this._map.clear();
  }
};
var ONE_FRAME_IN_MILLISECONDS = 1;
var ENTER_TOKEN = ":enter";
var ENTER_TOKEN_REGEX = new RegExp(ENTER_TOKEN, "g");
var LEAVE_TOKEN = ":leave";
var LEAVE_TOKEN_REGEX = new RegExp(LEAVE_TOKEN, "g");
function buildAnimationTimelines(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles = /* @__PURE__ */ new Map(), finalStyles = /* @__PURE__ */ new Map(), options, subInstructions, errors = []) {
  return new AnimationTimelineBuilderVisitor().buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors);
}
var AnimationTimelineBuilderVisitor = class {
  buildKeyframes(driver, rootElement, ast, enterClassName, leaveClassName, startingStyles, finalStyles, options, subInstructions, errors = []) {
    subInstructions = subInstructions || new ElementInstructionMap();
    const context = new AnimationTimelineContext(driver, rootElement, subInstructions, enterClassName, leaveClassName, errors, []);
    context.options = options;
    const delay = options.delay ? resolveTimingValue(options.delay) : 0;
    context.currentTimeline.delayNextStep(delay);
    context.currentTimeline.setStyles([startingStyles], null, context.errors, options);
    visitDslNode(this, ast, context);
    const timelines = context.timelines.filter((timeline) => timeline.containsAnimation());
    if (timelines.length && finalStyles.size) {
      let lastRootTimeline;
      for (let i = timelines.length - 1; i >= 0; i--) {
        const timeline = timelines[i];
        if (timeline.element === rootElement) {
          lastRootTimeline = timeline;
          break;
        }
      }
      if (lastRootTimeline && !lastRootTimeline.allowOnlyTimelineStyles()) {
        lastRootTimeline.setStyles([finalStyles], null, context.errors, options);
      }
    }
    return timelines.length ? timelines.map((timeline) => timeline.buildKeyframes()) : [createTimelineInstruction(rootElement, [], [], [], 0, delay, "", false)];
  }
  visitTrigger(ast, context) {
  }
  visitState(ast, context) {
  }
  visitTransition(ast, context) {
  }
  visitAnimateChild(ast, context) {
    const elementInstructions = context.subInstructions.get(context.element);
    if (elementInstructions) {
      const innerContext = context.createSubContext(ast.options);
      const startTime = context.currentTimeline.currentTime;
      const endTime = this._visitSubInstructions(elementInstructions, innerContext, innerContext.options);
      if (startTime != endTime) {
        context.transformIntoNewTimeline(endTime);
      }
    }
    context.previousNode = ast;
  }
  visitAnimateRef(ast, context) {
    const innerContext = context.createSubContext(ast.options);
    innerContext.transformIntoNewTimeline();
    this._applyAnimationRefDelays([ast.options, ast.animation.options], context, innerContext);
    this.visitReference(ast.animation, innerContext);
    context.transformIntoNewTimeline(innerContext.currentTimeline.currentTime);
    context.previousNode = ast;
  }
  _applyAnimationRefDelays(animationsRefsOptions, context, innerContext) {
    for (const animationRefOptions of animationsRefsOptions) {
      const animationDelay = animationRefOptions?.delay;
      if (animationDelay) {
        const animationDelayValue = typeof animationDelay === "number" ? animationDelay : resolveTimingValue(interpolateParams(animationDelay, animationRefOptions?.params ?? {}, context.errors));
        innerContext.delayNextStep(animationDelayValue);
      }
    }
  }
  _visitSubInstructions(instructions, context, options) {
    const startTime = context.currentTimeline.currentTime;
    let furthestTime = startTime;
    const duration = options.duration != null ? resolveTimingValue(options.duration) : null;
    const delay = options.delay != null ? resolveTimingValue(options.delay) : null;
    if (duration !== 0) {
      instructions.forEach((instruction) => {
        const instructionTimings = context.appendInstructionToTimeline(instruction, duration, delay);
        furthestTime = Math.max(furthestTime, instructionTimings.duration + instructionTimings.delay);
      });
    }
    return furthestTime;
  }
  visitReference(ast, context) {
    context.updateOptions(ast.options, true);
    visitDslNode(this, ast.animation, context);
    context.previousNode = ast;
  }
  visitSequence(ast, context) {
    const subContextCount = context.subContextCount;
    let ctx = context;
    const options = ast.options;
    if (options && (options.params || options.delay)) {
      ctx = context.createSubContext(options);
      ctx.transformIntoNewTimeline();
      if (options.delay != null) {
        if (ctx.previousNode.type == AnimationMetadataType.Style) {
          ctx.currentTimeline.snapshotCurrentStyles();
          ctx.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
        }
        const delay = resolveTimingValue(options.delay);
        ctx.delayNextStep(delay);
      }
    }
    if (ast.steps.length) {
      ast.steps.forEach((s) => visitDslNode(this, s, ctx));
      ctx.currentTimeline.applyStylesToKeyframe();
      if (ctx.subContextCount > subContextCount) {
        ctx.transformIntoNewTimeline();
      }
    }
    context.previousNode = ast;
  }
  visitGroup(ast, context) {
    const innerTimelines = [];
    let furthestTime = context.currentTimeline.currentTime;
    const delay = ast.options && ast.options.delay ? resolveTimingValue(ast.options.delay) : 0;
    ast.steps.forEach((s) => {
      const innerContext = context.createSubContext(ast.options);
      if (delay) {
        innerContext.delayNextStep(delay);
      }
      visitDslNode(this, s, innerContext);
      furthestTime = Math.max(furthestTime, innerContext.currentTimeline.currentTime);
      innerTimelines.push(innerContext.currentTimeline);
    });
    innerTimelines.forEach((timeline) => context.currentTimeline.mergeTimelineCollectedStyles(timeline));
    context.transformIntoNewTimeline(furthestTime);
    context.previousNode = ast;
  }
  _visitTiming(ast, context) {
    if (ast.dynamic) {
      const strValue = ast.strValue;
      const timingValue = context.params ? interpolateParams(strValue, context.params, context.errors) : strValue;
      return resolveTiming(timingValue, context.errors);
    } else {
      return {
        duration: ast.duration,
        delay: ast.delay,
        easing: ast.easing
      };
    }
  }
  visitAnimate(ast, context) {
    const timings = context.currentAnimateTimings = this._visitTiming(ast.timings, context);
    const timeline = context.currentTimeline;
    if (timings.delay) {
      context.incrementTime(timings.delay);
      timeline.snapshotCurrentStyles();
    }
    const style2 = ast.style;
    if (style2.type == AnimationMetadataType.Keyframes) {
      this.visitKeyframes(style2, context);
    } else {
      context.incrementTime(timings.duration);
      this.visitStyle(style2, context);
      timeline.applyStylesToKeyframe();
    }
    context.currentAnimateTimings = null;
    context.previousNode = ast;
  }
  visitStyle(ast, context) {
    const timeline = context.currentTimeline;
    const timings = context.currentAnimateTimings;
    if (!timings && timeline.hasCurrentStyleProperties()) {
      timeline.forwardFrame();
    }
    const easing = timings && timings.easing || ast.easing;
    if (ast.isEmptyStep) {
      timeline.applyEmptyStep(easing);
    } else {
      timeline.setStyles(ast.styles, easing, context.errors, context.options);
    }
    context.previousNode = ast;
  }
  visitKeyframes(ast, context) {
    const currentAnimateTimings = context.currentAnimateTimings;
    const startTime = context.currentTimeline.duration;
    const duration = currentAnimateTimings.duration;
    const innerContext = context.createSubContext();
    const innerTimeline = innerContext.currentTimeline;
    innerTimeline.easing = currentAnimateTimings.easing;
    ast.styles.forEach((step) => {
      const offset = step.offset || 0;
      innerTimeline.forwardTime(offset * duration);
      innerTimeline.setStyles(step.styles, step.easing, context.errors, context.options);
      innerTimeline.applyStylesToKeyframe();
    });
    context.currentTimeline.mergeTimelineCollectedStyles(innerTimeline);
    context.transformIntoNewTimeline(startTime + duration);
    context.previousNode = ast;
  }
  visitQuery(ast, context) {
    const startTime = context.currentTimeline.currentTime;
    const options = ast.options || {};
    const delay = options.delay ? resolveTimingValue(options.delay) : 0;
    if (delay && (context.previousNode.type === AnimationMetadataType.Style || startTime == 0 && context.currentTimeline.hasCurrentStyleProperties())) {
      context.currentTimeline.snapshotCurrentStyles();
      context.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    }
    let furthestTime = startTime;
    const elms = context.invokeQuery(ast.selector, ast.originalSelector, ast.limit, ast.includeSelf, options.optional ? true : false, context.errors);
    context.currentQueryTotal = elms.length;
    let sameElementTimeline = null;
    elms.forEach((element, i) => {
      context.currentQueryIndex = i;
      const innerContext = context.createSubContext(ast.options, element);
      if (delay) {
        innerContext.delayNextStep(delay);
      }
      if (element === context.element) {
        sameElementTimeline = innerContext.currentTimeline;
      }
      visitDslNode(this, ast.animation, innerContext);
      innerContext.currentTimeline.applyStylesToKeyframe();
      const endTime = innerContext.currentTimeline.currentTime;
      furthestTime = Math.max(furthestTime, endTime);
    });
    context.currentQueryIndex = 0;
    context.currentQueryTotal = 0;
    context.transformIntoNewTimeline(furthestTime);
    if (sameElementTimeline) {
      context.currentTimeline.mergeTimelineCollectedStyles(sameElementTimeline);
      context.currentTimeline.snapshotCurrentStyles();
    }
    context.previousNode = ast;
  }
  visitStagger(ast, context) {
    const parentContext = context.parentContext;
    const tl = context.currentTimeline;
    const timings = ast.timings;
    const duration = Math.abs(timings.duration);
    const maxTime = duration * (context.currentQueryTotal - 1);
    let delay = duration * context.currentQueryIndex;
    let staggerTransformer = timings.duration < 0 ? "reverse" : timings.easing;
    switch (staggerTransformer) {
      case "reverse":
        delay = maxTime - delay;
        break;
      case "full":
        delay = parentContext.currentStaggerTime;
        break;
    }
    const timeline = context.currentTimeline;
    if (delay) {
      timeline.delayNextStep(delay);
    }
    const startingTime = timeline.currentTime;
    visitDslNode(this, ast.animation, context);
    context.previousNode = ast;
    parentContext.currentStaggerTime = tl.currentTime - startingTime + (tl.startTime - parentContext.currentTimeline.startTime);
  }
};
var DEFAULT_NOOP_PREVIOUS_NODE = {};
var AnimationTimelineContext = class _AnimationTimelineContext {
  constructor(_driver, element, subInstructions, _enterClassName, _leaveClassName, errors, timelines, initialTimeline) {
    this._driver = _driver;
    this.element = element;
    this.subInstructions = subInstructions;
    this._enterClassName = _enterClassName;
    this._leaveClassName = _leaveClassName;
    this.errors = errors;
    this.timelines = timelines;
    this.parentContext = null;
    this.currentAnimateTimings = null;
    this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    this.subContextCount = 0;
    this.options = {};
    this.currentQueryIndex = 0;
    this.currentQueryTotal = 0;
    this.currentStaggerTime = 0;
    this.currentTimeline = initialTimeline || new TimelineBuilder(this._driver, element, 0);
    timelines.push(this.currentTimeline);
  }
  get params() {
    return this.options.params;
  }
  updateOptions(options, skipIfExists) {
    if (!options)
      return;
    const newOptions = options;
    let optionsToUpdate = this.options;
    if (newOptions.duration != null) {
      optionsToUpdate.duration = resolveTimingValue(newOptions.duration);
    }
    if (newOptions.delay != null) {
      optionsToUpdate.delay = resolveTimingValue(newOptions.delay);
    }
    const newParams = newOptions.params;
    if (newParams) {
      let paramsToUpdate = optionsToUpdate.params;
      if (!paramsToUpdate) {
        paramsToUpdate = this.options.params = {};
      }
      Object.keys(newParams).forEach((name) => {
        if (!skipIfExists || !paramsToUpdate.hasOwnProperty(name)) {
          paramsToUpdate[name] = interpolateParams(newParams[name], paramsToUpdate, this.errors);
        }
      });
    }
  }
  _copyOptions() {
    const options = {};
    if (this.options) {
      const oldParams = this.options.params;
      if (oldParams) {
        const params = options["params"] = {};
        Object.keys(oldParams).forEach((name) => {
          params[name] = oldParams[name];
        });
      }
    }
    return options;
  }
  createSubContext(options = null, element, newTime) {
    const target = element || this.element;
    const context = new _AnimationTimelineContext(this._driver, target, this.subInstructions, this._enterClassName, this._leaveClassName, this.errors, this.timelines, this.currentTimeline.fork(target, newTime || 0));
    context.previousNode = this.previousNode;
    context.currentAnimateTimings = this.currentAnimateTimings;
    context.options = this._copyOptions();
    context.updateOptions(options);
    context.currentQueryIndex = this.currentQueryIndex;
    context.currentQueryTotal = this.currentQueryTotal;
    context.parentContext = this;
    this.subContextCount++;
    return context;
  }
  transformIntoNewTimeline(newTime) {
    this.previousNode = DEFAULT_NOOP_PREVIOUS_NODE;
    this.currentTimeline = this.currentTimeline.fork(this.element, newTime);
    this.timelines.push(this.currentTimeline);
    return this.currentTimeline;
  }
  appendInstructionToTimeline(instruction, duration, delay) {
    const updatedTimings = {
      duration: duration != null ? duration : instruction.duration,
      delay: this.currentTimeline.currentTime + (delay != null ? delay : 0) + instruction.delay,
      easing: ""
    };
    const builder = new SubTimelineBuilder(this._driver, instruction.element, instruction.keyframes, instruction.preStyleProps, instruction.postStyleProps, updatedTimings, instruction.stretchStartingKeyframe);
    this.timelines.push(builder);
    return updatedTimings;
  }
  incrementTime(time) {
    this.currentTimeline.forwardTime(this.currentTimeline.duration + time);
  }
  delayNextStep(delay) {
    if (delay > 0) {
      this.currentTimeline.delayNextStep(delay);
    }
  }
  invokeQuery(selector, originalSelector, limit, includeSelf, optional, errors) {
    let results = [];
    if (includeSelf) {
      results.push(this.element);
    }
    if (selector.length > 0) {
      selector = selector.replace(ENTER_TOKEN_REGEX, "." + this._enterClassName);
      selector = selector.replace(LEAVE_TOKEN_REGEX, "." + this._leaveClassName);
      const multi = limit != 1;
      let elements = this._driver.query(this.element, selector, multi);
      if (limit !== 0) {
        elements = limit < 0 ? elements.slice(elements.length + limit, elements.length) : elements.slice(0, limit);
      }
      results.push(...elements);
    }
    if (!optional && results.length == 0) {
      errors.push(invalidQuery(originalSelector));
    }
    return results;
  }
};
var TimelineBuilder = class _TimelineBuilder {
  constructor(_driver, element, startTime, _elementTimelineStylesLookup) {
    this._driver = _driver;
    this.element = element;
    this.startTime = startTime;
    this._elementTimelineStylesLookup = _elementTimelineStylesLookup;
    this.duration = 0;
    this.easing = null;
    this._previousKeyframe = /* @__PURE__ */ new Map();
    this._currentKeyframe = /* @__PURE__ */ new Map();
    this._keyframes = /* @__PURE__ */ new Map();
    this._styleSummary = /* @__PURE__ */ new Map();
    this._localTimelineStyles = /* @__PURE__ */ new Map();
    this._pendingStyles = /* @__PURE__ */ new Map();
    this._backFill = /* @__PURE__ */ new Map();
    this._currentEmptyStepKeyframe = null;
    if (!this._elementTimelineStylesLookup) {
      this._elementTimelineStylesLookup = /* @__PURE__ */ new Map();
    }
    this._globalTimelineStyles = this._elementTimelineStylesLookup.get(element);
    if (!this._globalTimelineStyles) {
      this._globalTimelineStyles = this._localTimelineStyles;
      this._elementTimelineStylesLookup.set(element, this._localTimelineStyles);
    }
    this._loadKeyframe();
  }
  containsAnimation() {
    switch (this._keyframes.size) {
      case 0:
        return false;
      case 1:
        return this.hasCurrentStyleProperties();
      default:
        return true;
    }
  }
  hasCurrentStyleProperties() {
    return this._currentKeyframe.size > 0;
  }
  get currentTime() {
    return this.startTime + this.duration;
  }
  delayNextStep(delay) {
    const hasPreStyleStep = this._keyframes.size === 1 && this._pendingStyles.size;
    if (this.duration || hasPreStyleStep) {
      this.forwardTime(this.currentTime + delay);
      if (hasPreStyleStep) {
        this.snapshotCurrentStyles();
      }
    } else {
      this.startTime += delay;
    }
  }
  fork(element, currentTime) {
    this.applyStylesToKeyframe();
    return new _TimelineBuilder(this._driver, element, currentTime || this.currentTime, this._elementTimelineStylesLookup);
  }
  _loadKeyframe() {
    if (this._currentKeyframe) {
      this._previousKeyframe = this._currentKeyframe;
    }
    this._currentKeyframe = this._keyframes.get(this.duration);
    if (!this._currentKeyframe) {
      this._currentKeyframe = /* @__PURE__ */ new Map();
      this._keyframes.set(this.duration, this._currentKeyframe);
    }
  }
  forwardFrame() {
    this.duration += ONE_FRAME_IN_MILLISECONDS;
    this._loadKeyframe();
  }
  forwardTime(time) {
    this.applyStylesToKeyframe();
    this.duration = time;
    this._loadKeyframe();
  }
  _updateStyle(prop, value) {
    this._localTimelineStyles.set(prop, value);
    this._globalTimelineStyles.set(prop, value);
    this._styleSummary.set(prop, {
      time: this.currentTime,
      value
    });
  }
  allowOnlyTimelineStyles() {
    return this._currentEmptyStepKeyframe !== this._currentKeyframe;
  }
  applyEmptyStep(easing) {
    if (easing) {
      this._previousKeyframe.set("easing", easing);
    }
    for (let [prop, value] of this._globalTimelineStyles) {
      this._backFill.set(prop, value || AUTO_STYLE);
      this._currentKeyframe.set(prop, AUTO_STYLE);
    }
    this._currentEmptyStepKeyframe = this._currentKeyframe;
  }
  setStyles(input, easing, errors, options) {
    if (easing) {
      this._previousKeyframe.set("easing", easing);
    }
    const params = options && options.params || {};
    const styles = flattenStyles(input, this._globalTimelineStyles);
    for (let [prop, value] of styles) {
      const val = interpolateParams(value, params, errors);
      this._pendingStyles.set(prop, val);
      if (!this._localTimelineStyles.has(prop)) {
        this._backFill.set(prop, this._globalTimelineStyles.get(prop) ?? AUTO_STYLE);
      }
      this._updateStyle(prop, val);
    }
  }
  applyStylesToKeyframe() {
    if (this._pendingStyles.size == 0)
      return;
    this._pendingStyles.forEach((val, prop) => {
      this._currentKeyframe.set(prop, val);
    });
    this._pendingStyles.clear();
    this._localTimelineStyles.forEach((val, prop) => {
      if (!this._currentKeyframe.has(prop)) {
        this._currentKeyframe.set(prop, val);
      }
    });
  }
  snapshotCurrentStyles() {
    for (let [prop, val] of this._localTimelineStyles) {
      this._pendingStyles.set(prop, val);
      this._updateStyle(prop, val);
    }
  }
  getFinalKeyframe() {
    return this._keyframes.get(this.duration);
  }
  get properties() {
    const properties = [];
    for (let prop in this._currentKeyframe) {
      properties.push(prop);
    }
    return properties;
  }
  mergeTimelineCollectedStyles(timeline) {
    timeline._styleSummary.forEach((details1, prop) => {
      const details0 = this._styleSummary.get(prop);
      if (!details0 || details1.time > details0.time) {
        this._updateStyle(prop, details1.value);
      }
    });
  }
  buildKeyframes() {
    this.applyStylesToKeyframe();
    const preStyleProps = /* @__PURE__ */ new Set();
    const postStyleProps = /* @__PURE__ */ new Set();
    const isEmpty = this._keyframes.size === 1 && this.duration === 0;
    let finalKeyframes = [];
    this._keyframes.forEach((keyframe, time) => {
      const finalKeyframe = new Map([...this._backFill, ...keyframe]);
      finalKeyframe.forEach((value, prop) => {
        if (value === \u0275PRE_STYLE) {
          preStyleProps.add(prop);
        } else if (value === AUTO_STYLE) {
          postStyleProps.add(prop);
        }
      });
      if (!isEmpty) {
        finalKeyframe.set("offset", time / this.duration);
      }
      finalKeyframes.push(finalKeyframe);
    });
    const preProps = [...preStyleProps.values()];
    const postProps = [...postStyleProps.values()];
    if (isEmpty) {
      const kf0 = finalKeyframes[0];
      const kf1 = new Map(kf0);
      kf0.set("offset", 0);
      kf1.set("offset", 1);
      finalKeyframes = [kf0, kf1];
    }
    return createTimelineInstruction(this.element, finalKeyframes, preProps, postProps, this.duration, this.startTime, this.easing, false);
  }
};
var SubTimelineBuilder = class extends TimelineBuilder {
  constructor(driver, element, keyframes, preStyleProps, postStyleProps, timings, _stretchStartingKeyframe = false) {
    super(driver, element, timings.delay);
    this.keyframes = keyframes;
    this.preStyleProps = preStyleProps;
    this.postStyleProps = postStyleProps;
    this._stretchStartingKeyframe = _stretchStartingKeyframe;
    this.timings = {
      duration: timings.duration,
      delay: timings.delay,
      easing: timings.easing
    };
  }
  containsAnimation() {
    return this.keyframes.length > 1;
  }
  buildKeyframes() {
    let keyframes = this.keyframes;
    let {
      delay,
      duration,
      easing
    } = this.timings;
    if (this._stretchStartingKeyframe && delay) {
      const newKeyframes = [];
      const totalTime = duration + delay;
      const startingGap = delay / totalTime;
      const newFirstKeyframe = new Map(keyframes[0]);
      newFirstKeyframe.set("offset", 0);
      newKeyframes.push(newFirstKeyframe);
      const oldFirstKeyframe = new Map(keyframes[0]);
      oldFirstKeyframe.set("offset", roundOffset(startingGap));
      newKeyframes.push(oldFirstKeyframe);
      const limit = keyframes.length - 1;
      for (let i = 1; i <= limit; i++) {
        let kf = new Map(keyframes[i]);
        const oldOffset = kf.get("offset");
        const timeAtKeyframe = delay + oldOffset * duration;
        kf.set("offset", roundOffset(timeAtKeyframe / totalTime));
        newKeyframes.push(kf);
      }
      duration = totalTime;
      delay = 0;
      easing = "";
      keyframes = newKeyframes;
    }
    return createTimelineInstruction(this.element, keyframes, this.preStyleProps, this.postStyleProps, duration, delay, easing, true);
  }
};
function roundOffset(offset, decimalPoints = 3) {
  const mult = Math.pow(10, decimalPoints - 1);
  return Math.round(offset * mult) / mult;
}
function flattenStyles(input, allStyles) {
  const styles = /* @__PURE__ */ new Map();
  let allProperties;
  input.forEach((token) => {
    if (token === "*") {
      allProperties ??= allStyles.keys();
      for (let prop of allProperties) {
        styles.set(prop, AUTO_STYLE);
      }
    } else {
      for (let [prop, val] of token) {
        styles.set(prop, val);
      }
    }
  });
  return styles;
}
function createTransitionInstruction(element, triggerName, fromState, toState, isRemovalTransition, fromStyles, toStyles, timelines, queriedElements, preStyleProps, postStyleProps, totalTime, errors) {
  return {
    type: 0,
    element,
    triggerName,
    isRemovalTransition,
    fromState,
    fromStyles,
    toState,
    toStyles,
    timelines,
    queriedElements,
    preStyleProps,
    postStyleProps,
    totalTime,
    errors
  };
}
var EMPTY_OBJECT = {};
var AnimationTransitionFactory = class {
  constructor(_triggerName, ast, _stateStyles) {
    this._triggerName = _triggerName;
    this.ast = ast;
    this._stateStyles = _stateStyles;
  }
  match(currentState, nextState, element, params) {
    return oneOrMoreTransitionsMatch(this.ast.matchers, currentState, nextState, element, params);
  }
  buildStyles(stateName, params, errors) {
    let styler = this._stateStyles.get("*");
    if (stateName !== void 0) {
      styler = this._stateStyles.get(stateName?.toString()) || styler;
    }
    return styler ? styler.buildStyles(params, errors) : /* @__PURE__ */ new Map();
  }
  build(driver, element, currentState, nextState, enterClassName, leaveClassName, currentOptions, nextOptions, subInstructions, skipAstBuild) {
    const errors = [];
    const transitionAnimationParams = this.ast.options && this.ast.options.params || EMPTY_OBJECT;
    const currentAnimationParams = currentOptions && currentOptions.params || EMPTY_OBJECT;
    const currentStateStyles = this.buildStyles(currentState, currentAnimationParams, errors);
    const nextAnimationParams = nextOptions && nextOptions.params || EMPTY_OBJECT;
    const nextStateStyles = this.buildStyles(nextState, nextAnimationParams, errors);
    const queriedElements = /* @__PURE__ */ new Set();
    const preStyleMap = /* @__PURE__ */ new Map();
    const postStyleMap = /* @__PURE__ */ new Map();
    const isRemoval = nextState === "void";
    const animationOptions = {
      params: applyParamDefaults(nextAnimationParams, transitionAnimationParams),
      delay: this.ast.options?.delay
    };
    const timelines = skipAstBuild ? [] : buildAnimationTimelines(driver, element, this.ast.animation, enterClassName, leaveClassName, currentStateStyles, nextStateStyles, animationOptions, subInstructions, errors);
    let totalTime = 0;
    timelines.forEach((tl) => {
      totalTime = Math.max(tl.duration + tl.delay, totalTime);
    });
    if (errors.length) {
      return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, [], [], preStyleMap, postStyleMap, totalTime, errors);
    }
    timelines.forEach((tl) => {
      const elm = tl.element;
      const preProps = getOrSetDefaultValue(preStyleMap, elm, /* @__PURE__ */ new Set());
      tl.preStyleProps.forEach((prop) => preProps.add(prop));
      const postProps = getOrSetDefaultValue(postStyleMap, elm, /* @__PURE__ */ new Set());
      tl.postStyleProps.forEach((prop) => postProps.add(prop));
      if (elm !== element) {
        queriedElements.add(elm);
      }
    });
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      checkNonAnimatableInTimelines(timelines, this._triggerName, driver);
    }
    return createTransitionInstruction(element, this._triggerName, currentState, nextState, isRemoval, currentStateStyles, nextStateStyles, timelines, [...queriedElements.values()], preStyleMap, postStyleMap, totalTime);
  }
};
function checkNonAnimatableInTimelines(timelines, triggerName, driver) {
  if (!driver.validateAnimatableStyleProperty) {
    return;
  }
  const allowedNonAnimatableProps = /* @__PURE__ */ new Set([
    // 'easing' is a utility/synthetic prop we use to represent
    // easing functions, it represents a property of the animation
    // which is not animatable but different values can be used
    // in different steps
    "easing"
  ]);
  const invalidNonAnimatableProps = /* @__PURE__ */ new Set();
  timelines.forEach(({
    keyframes
  }) => {
    const nonAnimatablePropsInitialValues = /* @__PURE__ */ new Map();
    keyframes.forEach((keyframe) => {
      const entriesToCheck = Array.from(keyframe.entries()).filter(([prop]) => !allowedNonAnimatableProps.has(prop));
      for (const [prop, value] of entriesToCheck) {
        if (!driver.validateAnimatableStyleProperty(prop)) {
          if (nonAnimatablePropsInitialValues.has(prop) && !invalidNonAnimatableProps.has(prop)) {
            const propInitialValue = nonAnimatablePropsInitialValues.get(prop);
            if (propInitialValue !== value) {
              invalidNonAnimatableProps.add(prop);
            }
          } else {
            nonAnimatablePropsInitialValues.set(prop, value);
          }
        }
      }
    });
  });
  if (invalidNonAnimatableProps.size > 0) {
    console.warn(`Warning: The animation trigger "${triggerName}" is attempting to animate the following not animatable properties: ` + Array.from(invalidNonAnimatableProps).join(", ") + "\n(to check the list of all animatable properties visit https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animated_properties)");
  }
}
function oneOrMoreTransitionsMatch(matchFns, currentState, nextState, element, params) {
  return matchFns.some((fn) => fn(currentState, nextState, element, params));
}
function applyParamDefaults(userParams, defaults) {
  const result = __spreadValues({}, defaults);
  Object.entries(userParams).forEach(([key, value]) => {
    if (value != null) {
      result[key] = value;
    }
  });
  return result;
}
var AnimationStateStyles = class {
  constructor(styles, defaultParams, normalizer) {
    this.styles = styles;
    this.defaultParams = defaultParams;
    this.normalizer = normalizer;
  }
  buildStyles(params, errors) {
    const finalStyles = /* @__PURE__ */ new Map();
    const combinedParams = applyParamDefaults(params, this.defaultParams);
    this.styles.styles.forEach((value) => {
      if (typeof value !== "string") {
        value.forEach((val, prop) => {
          if (val) {
            val = interpolateParams(val, combinedParams, errors);
          }
          const normalizedProp = this.normalizer.normalizePropertyName(prop, errors);
          val = this.normalizer.normalizeStyleValue(prop, normalizedProp, val, errors);
          finalStyles.set(prop, val);
        });
      }
    });
    return finalStyles;
  }
};
function buildTrigger(name, ast, normalizer) {
  return new AnimationTrigger(name, ast, normalizer);
}
var AnimationTrigger = class {
  constructor(name, ast, _normalizer) {
    this.name = name;
    this.ast = ast;
    this._normalizer = _normalizer;
    this.transitionFactories = [];
    this.states = /* @__PURE__ */ new Map();
    ast.states.forEach((ast2) => {
      const defaultParams = ast2.options && ast2.options.params || {};
      this.states.set(ast2.name, new AnimationStateStyles(ast2.style, defaultParams, _normalizer));
    });
    balanceProperties(this.states, "true", "1");
    balanceProperties(this.states, "false", "0");
    ast.transitions.forEach((ast2) => {
      this.transitionFactories.push(new AnimationTransitionFactory(name, ast2, this.states));
    });
    this.fallbackTransition = createFallbackTransition(name, this.states, this._normalizer);
  }
  get containsQueries() {
    return this.ast.queryCount > 0;
  }
  matchTransition(currentState, nextState, element, params) {
    const entry = this.transitionFactories.find((f) => f.match(currentState, nextState, element, params));
    return entry || null;
  }
  matchStyles(currentState, params, errors) {
    return this.fallbackTransition.buildStyles(currentState, params, errors);
  }
};
function createFallbackTransition(triggerName, states, normalizer) {
  const matchers = [(fromState, toState) => true];
  const animation = {
    type: AnimationMetadataType.Sequence,
    steps: [],
    options: null
  };
  const transition = {
    type: AnimationMetadataType.Transition,
    animation,
    matchers,
    options: null,
    queryCount: 0,
    depCount: 0
  };
  return new AnimationTransitionFactory(triggerName, transition, states);
}
function balanceProperties(stateMap, key1, key2) {
  if (stateMap.has(key1)) {
    if (!stateMap.has(key2)) {
      stateMap.set(key2, stateMap.get(key1));
    }
  } else if (stateMap.has(key2)) {
    stateMap.set(key1, stateMap.get(key2));
  }
}
var EMPTY_INSTRUCTION_MAP = new ElementInstructionMap();
var TimelineAnimationEngine = class {
  constructor(bodyNode, _driver, _normalizer) {
    this.bodyNode = bodyNode;
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._animations = /* @__PURE__ */ new Map();
    this._playersById = /* @__PURE__ */ new Map();
    this.players = [];
  }
  register(id, metadata) {
    const errors = [];
    const warnings = [];
    const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
    if (errors.length) {
      throw registerFailed(errors);
    } else {
      if (warnings.length) {
        warnRegister(warnings);
      }
      this._animations.set(id, ast);
    }
  }
  _buildPlayer(i, preStyles, postStyles) {
    const element = i.element;
    const keyframes = normalizeKeyframes$1(this._normalizer, i.keyframes, preStyles, postStyles);
    return this._driver.animate(element, keyframes, i.duration, i.delay, i.easing, [], true);
  }
  create(id, element, options = {}) {
    const errors = [];
    const ast = this._animations.get(id);
    let instructions;
    const autoStylesMap = /* @__PURE__ */ new Map();
    if (ast) {
      instructions = buildAnimationTimelines(this._driver, element, ast, ENTER_CLASSNAME, LEAVE_CLASSNAME, /* @__PURE__ */ new Map(), /* @__PURE__ */ new Map(), options, EMPTY_INSTRUCTION_MAP, errors);
      instructions.forEach((inst) => {
        const styles = getOrSetDefaultValue(autoStylesMap, inst.element, /* @__PURE__ */ new Map());
        inst.postStyleProps.forEach((prop) => styles.set(prop, null));
      });
    } else {
      errors.push(missingOrDestroyedAnimation());
      instructions = [];
    }
    if (errors.length) {
      throw createAnimationFailed(errors);
    }
    autoStylesMap.forEach((styles, element2) => {
      styles.forEach((_, prop) => {
        styles.set(prop, this._driver.computeStyle(element2, prop, AUTO_STYLE));
      });
    });
    const players = instructions.map((i) => {
      const styles = autoStylesMap.get(i.element);
      return this._buildPlayer(i, /* @__PURE__ */ new Map(), styles);
    });
    const player = optimizeGroupPlayer(players);
    this._playersById.set(id, player);
    player.onDestroy(() => this.destroy(id));
    this.players.push(player);
    return player;
  }
  destroy(id) {
    const player = this._getPlayer(id);
    player.destroy();
    this._playersById.delete(id);
    const index = this.players.indexOf(player);
    if (index >= 0) {
      this.players.splice(index, 1);
    }
  }
  _getPlayer(id) {
    const player = this._playersById.get(id);
    if (!player) {
      throw missingPlayer(id);
    }
    return player;
  }
  listen(id, element, eventName, callback) {
    const baseEvent = makeAnimationEvent(element, "", "", "");
    listenOnPlayer(this._getPlayer(id), eventName, baseEvent, callback);
    return () => {
    };
  }
  command(id, element, command, args) {
    if (command == "register") {
      this.register(id, args[0]);
      return;
    }
    if (command == "create") {
      const options = args[0] || {};
      this.create(id, element, options);
      return;
    }
    const player = this._getPlayer(id);
    switch (command) {
      case "play":
        player.play();
        break;
      case "pause":
        player.pause();
        break;
      case "reset":
        player.reset();
        break;
      case "restart":
        player.restart();
        break;
      case "finish":
        player.finish();
        break;
      case "init":
        player.init();
        break;
      case "setPosition":
        player.setPosition(parseFloat(args[0]));
        break;
      case "destroy":
        this.destroy(id);
        break;
    }
  }
};
var QUEUED_CLASSNAME = "ng-animate-queued";
var QUEUED_SELECTOR = ".ng-animate-queued";
var DISABLED_CLASSNAME = "ng-animate-disabled";
var DISABLED_SELECTOR = ".ng-animate-disabled";
var STAR_CLASSNAME = "ng-star-inserted";
var STAR_SELECTOR = ".ng-star-inserted";
var EMPTY_PLAYER_ARRAY = [];
var NULL_REMOVAL_STATE = {
  namespaceId: "",
  setForRemoval: false,
  setForMove: false,
  hasAnimation: false,
  removedBeforeQueried: false
};
var NULL_REMOVED_QUERIED_STATE = {
  namespaceId: "",
  setForMove: false,
  setForRemoval: false,
  hasAnimation: false,
  removedBeforeQueried: true
};
var REMOVAL_FLAG = "__ng_removed";
var StateValue = class {
  get params() {
    return this.options.params;
  }
  constructor(input, namespaceId = "") {
    this.namespaceId = namespaceId;
    const isObj = input && input.hasOwnProperty("value");
    const value = isObj ? input["value"] : input;
    this.value = normalizeTriggerValue(value);
    if (isObj) {
      const _a = input, {
        value: value2
      } = _a, options = __objRest(_a, [
        "value"
      ]);
      this.options = options;
    } else {
      this.options = {};
    }
    if (!this.options.params) {
      this.options.params = {};
    }
  }
  absorbOptions(options) {
    const newParams = options.params;
    if (newParams) {
      const oldParams = this.options.params;
      Object.keys(newParams).forEach((prop) => {
        if (oldParams[prop] == null) {
          oldParams[prop] = newParams[prop];
        }
      });
    }
  }
};
var VOID_VALUE = "void";
var DEFAULT_STATE_VALUE = new StateValue(VOID_VALUE);
var AnimationTransitionNamespace = class {
  constructor(id, hostElement, _engine) {
    this.id = id;
    this.hostElement = hostElement;
    this._engine = _engine;
    this.players = [];
    this._triggers = /* @__PURE__ */ new Map();
    this._queue = [];
    this._elementListeners = /* @__PURE__ */ new Map();
    this._hostClassName = "ng-tns-" + id;
    addClass(hostElement, this._hostClassName);
  }
  listen(element, name, phase, callback) {
    if (!this._triggers.has(name)) {
      throw missingTrigger(phase, name);
    }
    if (phase == null || phase.length == 0) {
      throw missingEvent(name);
    }
    if (!isTriggerEventValid(phase)) {
      throw unsupportedTriggerEvent(phase, name);
    }
    const listeners = getOrSetDefaultValue(this._elementListeners, element, []);
    const data = {
      name,
      phase,
      callback
    };
    listeners.push(data);
    const triggersWithStates = getOrSetDefaultValue(this._engine.statesByElement, element, /* @__PURE__ */ new Map());
    if (!triggersWithStates.has(name)) {
      addClass(element, NG_TRIGGER_CLASSNAME);
      addClass(element, NG_TRIGGER_CLASSNAME + "-" + name);
      triggersWithStates.set(name, DEFAULT_STATE_VALUE);
    }
    return () => {
      this._engine.afterFlush(() => {
        const index = listeners.indexOf(data);
        if (index >= 0) {
          listeners.splice(index, 1);
        }
        if (!this._triggers.has(name)) {
          triggersWithStates.delete(name);
        }
      });
    };
  }
  register(name, ast) {
    if (this._triggers.has(name)) {
      return false;
    } else {
      this._triggers.set(name, ast);
      return true;
    }
  }
  _getTrigger(name) {
    const trigger = this._triggers.get(name);
    if (!trigger) {
      throw unregisteredTrigger(name);
    }
    return trigger;
  }
  trigger(element, triggerName, value, defaultToFallback = true) {
    const trigger = this._getTrigger(triggerName);
    const player = new TransitionAnimationPlayer(this.id, triggerName, element);
    let triggersWithStates = this._engine.statesByElement.get(element);
    if (!triggersWithStates) {
      addClass(element, NG_TRIGGER_CLASSNAME);
      addClass(element, NG_TRIGGER_CLASSNAME + "-" + triggerName);
      this._engine.statesByElement.set(element, triggersWithStates = /* @__PURE__ */ new Map());
    }
    let fromState = triggersWithStates.get(triggerName);
    const toState = new StateValue(value, this.id);
    const isObj = value && value.hasOwnProperty("value");
    if (!isObj && fromState) {
      toState.absorbOptions(fromState.options);
    }
    triggersWithStates.set(triggerName, toState);
    if (!fromState) {
      fromState = DEFAULT_STATE_VALUE;
    }
    const isRemoval = toState.value === VOID_VALUE;
    if (!isRemoval && fromState.value === toState.value) {
      if (!objEquals(fromState.params, toState.params)) {
        const errors = [];
        const fromStyles = trigger.matchStyles(fromState.value, fromState.params, errors);
        const toStyles = trigger.matchStyles(toState.value, toState.params, errors);
        if (errors.length) {
          this._engine.reportError(errors);
        } else {
          this._engine.afterFlush(() => {
            eraseStyles(element, fromStyles);
            setStyles(element, toStyles);
          });
        }
      }
      return;
    }
    const playersOnElement = getOrSetDefaultValue(this._engine.playersByElement, element, []);
    playersOnElement.forEach((player2) => {
      if (player2.namespaceId == this.id && player2.triggerName == triggerName && player2.queued) {
        player2.destroy();
      }
    });
    let transition = trigger.matchTransition(fromState.value, toState.value, element, toState.params);
    let isFallbackTransition = false;
    if (!transition) {
      if (!defaultToFallback)
        return;
      transition = trigger.fallbackTransition;
      isFallbackTransition = true;
    }
    this._engine.totalQueuedPlayers++;
    this._queue.push({
      element,
      triggerName,
      transition,
      fromState,
      toState,
      player,
      isFallbackTransition
    });
    if (!isFallbackTransition) {
      addClass(element, QUEUED_CLASSNAME);
      player.onStart(() => {
        removeClass(element, QUEUED_CLASSNAME);
      });
    }
    player.onDone(() => {
      let index = this.players.indexOf(player);
      if (index >= 0) {
        this.players.splice(index, 1);
      }
      const players = this._engine.playersByElement.get(element);
      if (players) {
        let index2 = players.indexOf(player);
        if (index2 >= 0) {
          players.splice(index2, 1);
        }
      }
    });
    this.players.push(player);
    playersOnElement.push(player);
    return player;
  }
  deregister(name) {
    this._triggers.delete(name);
    this._engine.statesByElement.forEach((stateMap) => stateMap.delete(name));
    this._elementListeners.forEach((listeners, element) => {
      this._elementListeners.set(element, listeners.filter((entry) => {
        return entry.name != name;
      }));
    });
  }
  clearElementCache(element) {
    this._engine.statesByElement.delete(element);
    this._elementListeners.delete(element);
    const elementPlayers = this._engine.playersByElement.get(element);
    if (elementPlayers) {
      elementPlayers.forEach((player) => player.destroy());
      this._engine.playersByElement.delete(element);
    }
  }
  _signalRemovalForInnerTriggers(rootElement, context) {
    const elements = this._engine.driver.query(rootElement, NG_TRIGGER_SELECTOR, true);
    elements.forEach((elm) => {
      if (elm[REMOVAL_FLAG])
        return;
      const namespaces = this._engine.fetchNamespacesByElement(elm);
      if (namespaces.size) {
        namespaces.forEach((ns) => ns.triggerLeaveAnimation(elm, context, false, true));
      } else {
        this.clearElementCache(elm);
      }
    });
    this._engine.afterFlushAnimationsDone(() => elements.forEach((elm) => this.clearElementCache(elm)));
  }
  triggerLeaveAnimation(element, context, destroyAfterComplete, defaultToFallback) {
    const triggerStates = this._engine.statesByElement.get(element);
    const previousTriggersValues = /* @__PURE__ */ new Map();
    if (triggerStates) {
      const players = [];
      triggerStates.forEach((state, triggerName) => {
        previousTriggersValues.set(triggerName, state.value);
        if (this._triggers.has(triggerName)) {
          const player = this.trigger(element, triggerName, VOID_VALUE, defaultToFallback);
          if (player) {
            players.push(player);
          }
        }
      });
      if (players.length) {
        this._engine.markElementAsRemoved(this.id, element, true, context, previousTriggersValues);
        if (destroyAfterComplete) {
          optimizeGroupPlayer(players).onDone(() => this._engine.processLeaveNode(element));
        }
        return true;
      }
    }
    return false;
  }
  prepareLeaveAnimationListeners(element) {
    const listeners = this._elementListeners.get(element);
    const elementStates = this._engine.statesByElement.get(element);
    if (listeners && elementStates) {
      const visitedTriggers = /* @__PURE__ */ new Set();
      listeners.forEach((listener) => {
        const triggerName = listener.name;
        if (visitedTriggers.has(triggerName))
          return;
        visitedTriggers.add(triggerName);
        const trigger = this._triggers.get(triggerName);
        const transition = trigger.fallbackTransition;
        const fromState = elementStates.get(triggerName) || DEFAULT_STATE_VALUE;
        const toState = new StateValue(VOID_VALUE);
        const player = new TransitionAnimationPlayer(this.id, triggerName, element);
        this._engine.totalQueuedPlayers++;
        this._queue.push({
          element,
          triggerName,
          transition,
          fromState,
          toState,
          player,
          isFallbackTransition: true
        });
      });
    }
  }
  removeNode(element, context) {
    const engine = this._engine;
    if (element.childElementCount) {
      this._signalRemovalForInnerTriggers(element, context);
    }
    if (this.triggerLeaveAnimation(element, context, true))
      return;
    let containsPotentialParentTransition = false;
    if (engine.totalAnimations) {
      const currentPlayers = engine.players.length ? engine.playersByQueriedElement.get(element) : [];
      if (currentPlayers && currentPlayers.length) {
        containsPotentialParentTransition = true;
      } else {
        let parent = element;
        while (parent = parent.parentNode) {
          const triggers = engine.statesByElement.get(parent);
          if (triggers) {
            containsPotentialParentTransition = true;
            break;
          }
        }
      }
    }
    this.prepareLeaveAnimationListeners(element);
    if (containsPotentialParentTransition) {
      engine.markElementAsRemoved(this.id, element, false, context);
    } else {
      const removalFlag = element[REMOVAL_FLAG];
      if (!removalFlag || removalFlag === NULL_REMOVAL_STATE) {
        engine.afterFlush(() => this.clearElementCache(element));
        engine.destroyInnerAnimations(element);
        engine._onRemovalComplete(element, context);
      }
    }
  }
  insertNode(element, parent) {
    addClass(element, this._hostClassName);
  }
  drainQueuedTransitions(microtaskId) {
    const instructions = [];
    this._queue.forEach((entry) => {
      const player = entry.player;
      if (player.destroyed)
        return;
      const element = entry.element;
      const listeners = this._elementListeners.get(element);
      if (listeners) {
        listeners.forEach((listener) => {
          if (listener.name == entry.triggerName) {
            const baseEvent = makeAnimationEvent(element, entry.triggerName, entry.fromState.value, entry.toState.value);
            baseEvent["_data"] = microtaskId;
            listenOnPlayer(entry.player, listener.phase, baseEvent, listener.callback);
          }
        });
      }
      if (player.markedForDestroy) {
        this._engine.afterFlush(() => {
          player.destroy();
        });
      } else {
        instructions.push(entry);
      }
    });
    this._queue = [];
    return instructions.sort((a, b) => {
      const d0 = a.transition.ast.depCount;
      const d1 = b.transition.ast.depCount;
      if (d0 == 0 || d1 == 0) {
        return d0 - d1;
      }
      return this._engine.driver.containsElement(a.element, b.element) ? 1 : -1;
    });
  }
  destroy(context) {
    this.players.forEach((p) => p.destroy());
    this._signalRemovalForInnerTriggers(this.hostElement, context);
  }
};
var TransitionAnimationEngine = class {
  /** @internal */
  _onRemovalComplete(element, context) {
    this.onRemovalComplete(element, context);
  }
  constructor(bodyNode, driver, _normalizer, scheduler) {
    this.bodyNode = bodyNode;
    this.driver = driver;
    this._normalizer = _normalizer;
    this.scheduler = scheduler;
    this.players = [];
    this.newHostElements = /* @__PURE__ */ new Map();
    this.playersByElement = /* @__PURE__ */ new Map();
    this.playersByQueriedElement = /* @__PURE__ */ new Map();
    this.statesByElement = /* @__PURE__ */ new Map();
    this.disabledNodes = /* @__PURE__ */ new Set();
    this.totalAnimations = 0;
    this.totalQueuedPlayers = 0;
    this._namespaceLookup = {};
    this._namespaceList = [];
    this._flushFns = [];
    this._whenQuietFns = [];
    this.namespacesByHostElement = /* @__PURE__ */ new Map();
    this.collectedEnterElements = [];
    this.collectedLeaveElements = [];
    this.onRemovalComplete = (element, context) => {
    };
  }
  get queuedPlayers() {
    const players = [];
    this._namespaceList.forEach((ns) => {
      ns.players.forEach((player) => {
        if (player.queued) {
          players.push(player);
        }
      });
    });
    return players;
  }
  createNamespace(namespaceId, hostElement) {
    const ns = new AnimationTransitionNamespace(namespaceId, hostElement, this);
    if (this.bodyNode && this.driver.containsElement(this.bodyNode, hostElement)) {
      this._balanceNamespaceList(ns, hostElement);
    } else {
      this.newHostElements.set(hostElement, ns);
      this.collectEnterElement(hostElement);
    }
    return this._namespaceLookup[namespaceId] = ns;
  }
  _balanceNamespaceList(ns, hostElement) {
    const namespaceList = this._namespaceList;
    const namespacesByHostElement = this.namespacesByHostElement;
    const limit = namespaceList.length - 1;
    if (limit >= 0) {
      let found = false;
      let ancestor = this.driver.getParentElement(hostElement);
      while (ancestor) {
        const ancestorNs = namespacesByHostElement.get(ancestor);
        if (ancestorNs) {
          const index = namespaceList.indexOf(ancestorNs);
          namespaceList.splice(index + 1, 0, ns);
          found = true;
          break;
        }
        ancestor = this.driver.getParentElement(ancestor);
      }
      if (!found) {
        namespaceList.unshift(ns);
      }
    } else {
      namespaceList.push(ns);
    }
    namespacesByHostElement.set(hostElement, ns);
    return ns;
  }
  register(namespaceId, hostElement) {
    let ns = this._namespaceLookup[namespaceId];
    if (!ns) {
      ns = this.createNamespace(namespaceId, hostElement);
    }
    return ns;
  }
  registerTrigger(namespaceId, name, trigger) {
    let ns = this._namespaceLookup[namespaceId];
    if (ns && ns.register(name, trigger)) {
      this.totalAnimations++;
    }
  }
  destroy(namespaceId, context) {
    if (!namespaceId)
      return;
    this.afterFlush(() => {
    });
    this.afterFlushAnimationsDone(() => {
      const ns = this._fetchNamespace(namespaceId);
      this.namespacesByHostElement.delete(ns.hostElement);
      const index = this._namespaceList.indexOf(ns);
      if (index >= 0) {
        this._namespaceList.splice(index, 1);
      }
      ns.destroy(context);
      delete this._namespaceLookup[namespaceId];
    });
  }
  _fetchNamespace(id) {
    return this._namespaceLookup[id];
  }
  fetchNamespacesByElement(element) {
    const namespaces = /* @__PURE__ */ new Set();
    const elementStates = this.statesByElement.get(element);
    if (elementStates) {
      for (let stateValue of elementStates.values()) {
        if (stateValue.namespaceId) {
          const ns = this._fetchNamespace(stateValue.namespaceId);
          if (ns) {
            namespaces.add(ns);
          }
        }
      }
    }
    return namespaces;
  }
  trigger(namespaceId, element, name, value) {
    if (isElementNode(element)) {
      const ns = this._fetchNamespace(namespaceId);
      if (ns) {
        ns.trigger(element, name, value);
        return true;
      }
    }
    return false;
  }
  insertNode(namespaceId, element, parent, insertBefore) {
    if (!isElementNode(element))
      return;
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval) {
      details.setForRemoval = false;
      details.setForMove = true;
      const index = this.collectedLeaveElements.indexOf(element);
      if (index >= 0) {
        this.collectedLeaveElements.splice(index, 1);
      }
    }
    if (namespaceId) {
      const ns = this._fetchNamespace(namespaceId);
      if (ns) {
        ns.insertNode(element, parent);
      }
    }
    if (insertBefore) {
      this.collectEnterElement(element);
    }
  }
  collectEnterElement(element) {
    this.collectedEnterElements.push(element);
  }
  markElementAsDisabled(element, value) {
    if (value) {
      if (!this.disabledNodes.has(element)) {
        this.disabledNodes.add(element);
        addClass(element, DISABLED_CLASSNAME);
      }
    } else if (this.disabledNodes.has(element)) {
      this.disabledNodes.delete(element);
      removeClass(element, DISABLED_CLASSNAME);
    }
  }
  removeNode(namespaceId, element, context) {
    if (isElementNode(element)) {
      this.scheduler?.notify();
      const ns = namespaceId ? this._fetchNamespace(namespaceId) : null;
      if (ns) {
        ns.removeNode(element, context);
      } else {
        this.markElementAsRemoved(namespaceId, element, false, context);
      }
      const hostNS = this.namespacesByHostElement.get(element);
      if (hostNS && hostNS.id !== namespaceId) {
        hostNS.removeNode(element, context);
      }
    } else {
      this._onRemovalComplete(element, context);
    }
  }
  markElementAsRemoved(namespaceId, element, hasAnimation, context, previousTriggersValues) {
    this.collectedLeaveElements.push(element);
    element[REMOVAL_FLAG] = {
      namespaceId,
      setForRemoval: context,
      hasAnimation,
      removedBeforeQueried: false,
      previousTriggersValues
    };
  }
  listen(namespaceId, element, name, phase, callback) {
    if (isElementNode(element)) {
      return this._fetchNamespace(namespaceId).listen(element, name, phase, callback);
    }
    return () => {
    };
  }
  _buildInstruction(entry, subTimelines, enterClassName, leaveClassName, skipBuildAst) {
    return entry.transition.build(this.driver, entry.element, entry.fromState.value, entry.toState.value, enterClassName, leaveClassName, entry.fromState.options, entry.toState.options, subTimelines, skipBuildAst);
  }
  destroyInnerAnimations(containerElement) {
    let elements = this.driver.query(containerElement, NG_TRIGGER_SELECTOR, true);
    elements.forEach((element) => this.destroyActiveAnimationsForElement(element));
    if (this.playersByQueriedElement.size == 0)
      return;
    elements = this.driver.query(containerElement, NG_ANIMATING_SELECTOR, true);
    elements.forEach((element) => this.finishActiveQueriedAnimationOnElement(element));
  }
  destroyActiveAnimationsForElement(element) {
    const players = this.playersByElement.get(element);
    if (players) {
      players.forEach((player) => {
        if (player.queued) {
          player.markedForDestroy = true;
        } else {
          player.destroy();
        }
      });
    }
  }
  finishActiveQueriedAnimationOnElement(element) {
    const players = this.playersByQueriedElement.get(element);
    if (players) {
      players.forEach((player) => player.finish());
    }
  }
  whenRenderingDone() {
    return new Promise((resolve) => {
      if (this.players.length) {
        return optimizeGroupPlayer(this.players).onDone(() => resolve());
      } else {
        resolve();
      }
    });
  }
  processLeaveNode(element) {
    const details = element[REMOVAL_FLAG];
    if (details && details.setForRemoval) {
      element[REMOVAL_FLAG] = NULL_REMOVAL_STATE;
      if (details.namespaceId) {
        this.destroyInnerAnimations(element);
        const ns = this._fetchNamespace(details.namespaceId);
        if (ns) {
          ns.clearElementCache(element);
        }
      }
      this._onRemovalComplete(element, details.setForRemoval);
    }
    if (element.classList?.contains(DISABLED_CLASSNAME)) {
      this.markElementAsDisabled(element, false);
    }
    this.driver.query(element, DISABLED_SELECTOR, true).forEach((node) => {
      this.markElementAsDisabled(node, false);
    });
  }
  flush(microtaskId = -1) {
    let players = [];
    if (this.newHostElements.size) {
      this.newHostElements.forEach((ns, element) => this._balanceNamespaceList(ns, element));
      this.newHostElements.clear();
    }
    if (this.totalAnimations && this.collectedEnterElements.length) {
      for (let i = 0; i < this.collectedEnterElements.length; i++) {
        const elm = this.collectedEnterElements[i];
        addClass(elm, STAR_CLASSNAME);
      }
    }
    if (this._namespaceList.length && (this.totalQueuedPlayers || this.collectedLeaveElements.length)) {
      const cleanupFns = [];
      try {
        players = this._flushAnimations(cleanupFns, microtaskId);
      } finally {
        for (let i = 0; i < cleanupFns.length; i++) {
          cleanupFns[i]();
        }
      }
    } else {
      for (let i = 0; i < this.collectedLeaveElements.length; i++) {
        const element = this.collectedLeaveElements[i];
        this.processLeaveNode(element);
      }
    }
    this.totalQueuedPlayers = 0;
    this.collectedEnterElements.length = 0;
    this.collectedLeaveElements.length = 0;
    this._flushFns.forEach((fn) => fn());
    this._flushFns = [];
    if (this._whenQuietFns.length) {
      const quietFns = this._whenQuietFns;
      this._whenQuietFns = [];
      if (players.length) {
        optimizeGroupPlayer(players).onDone(() => {
          quietFns.forEach((fn) => fn());
        });
      } else {
        quietFns.forEach((fn) => fn());
      }
    }
  }
  reportError(errors) {
    throw triggerTransitionsFailed(errors);
  }
  _flushAnimations(cleanupFns, microtaskId) {
    const subTimelines = new ElementInstructionMap();
    const skippedPlayers = [];
    const skippedPlayersMap = /* @__PURE__ */ new Map();
    const queuedInstructions = [];
    const queriedElements = /* @__PURE__ */ new Map();
    const allPreStyleElements = /* @__PURE__ */ new Map();
    const allPostStyleElements = /* @__PURE__ */ new Map();
    const disabledElementsSet = /* @__PURE__ */ new Set();
    this.disabledNodes.forEach((node) => {
      disabledElementsSet.add(node);
      const nodesThatAreDisabled = this.driver.query(node, QUEUED_SELECTOR, true);
      for (let i2 = 0; i2 < nodesThatAreDisabled.length; i2++) {
        disabledElementsSet.add(nodesThatAreDisabled[i2]);
      }
    });
    const bodyNode = this.bodyNode;
    const allTriggerElements = Array.from(this.statesByElement.keys());
    const enterNodeMap = buildRootMap(allTriggerElements, this.collectedEnterElements);
    const enterNodeMapIds = /* @__PURE__ */ new Map();
    let i = 0;
    enterNodeMap.forEach((nodes, root) => {
      const className = ENTER_CLASSNAME + i++;
      enterNodeMapIds.set(root, className);
      nodes.forEach((node) => addClass(node, className));
    });
    const allLeaveNodes = [];
    const mergedLeaveNodes = /* @__PURE__ */ new Set();
    const leaveNodesWithoutAnimations = /* @__PURE__ */ new Set();
    for (let i2 = 0; i2 < this.collectedLeaveElements.length; i2++) {
      const element = this.collectedLeaveElements[i2];
      const details = element[REMOVAL_FLAG];
      if (details && details.setForRemoval) {
        allLeaveNodes.push(element);
        mergedLeaveNodes.add(element);
        if (details.hasAnimation) {
          this.driver.query(element, STAR_SELECTOR, true).forEach((elm) => mergedLeaveNodes.add(elm));
        } else {
          leaveNodesWithoutAnimations.add(element);
        }
      }
    }
    const leaveNodeMapIds = /* @__PURE__ */ new Map();
    const leaveNodeMap = buildRootMap(allTriggerElements, Array.from(mergedLeaveNodes));
    leaveNodeMap.forEach((nodes, root) => {
      const className = LEAVE_CLASSNAME + i++;
      leaveNodeMapIds.set(root, className);
      nodes.forEach((node) => addClass(node, className));
    });
    cleanupFns.push(() => {
      enterNodeMap.forEach((nodes, root) => {
        const className = enterNodeMapIds.get(root);
        nodes.forEach((node) => removeClass(node, className));
      });
      leaveNodeMap.forEach((nodes, root) => {
        const className = leaveNodeMapIds.get(root);
        nodes.forEach((node) => removeClass(node, className));
      });
      allLeaveNodes.forEach((element) => {
        this.processLeaveNode(element);
      });
    });
    const allPlayers = [];
    const erroneousTransitions = [];
    for (let i2 = this._namespaceList.length - 1; i2 >= 0; i2--) {
      const ns = this._namespaceList[i2];
      ns.drainQueuedTransitions(microtaskId).forEach((entry) => {
        const player = entry.player;
        const element = entry.element;
        allPlayers.push(player);
        if (this.collectedEnterElements.length) {
          const details = element[REMOVAL_FLAG];
          if (details && details.setForMove) {
            if (details.previousTriggersValues && details.previousTriggersValues.has(entry.triggerName)) {
              const previousValue = details.previousTriggersValues.get(entry.triggerName);
              const triggersWithStates = this.statesByElement.get(entry.element);
              if (triggersWithStates && triggersWithStates.has(entry.triggerName)) {
                const state = triggersWithStates.get(entry.triggerName);
                state.value = previousValue;
                triggersWithStates.set(entry.triggerName, state);
              }
            }
            player.destroy();
            return;
          }
        }
        const nodeIsOrphaned = !bodyNode || !this.driver.containsElement(bodyNode, element);
        const leaveClassName = leaveNodeMapIds.get(element);
        const enterClassName = enterNodeMapIds.get(element);
        const instruction = this._buildInstruction(entry, subTimelines, enterClassName, leaveClassName, nodeIsOrphaned);
        if (instruction.errors && instruction.errors.length) {
          erroneousTransitions.push(instruction);
          return;
        }
        if (nodeIsOrphaned) {
          player.onStart(() => eraseStyles(element, instruction.fromStyles));
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          skippedPlayers.push(player);
          return;
        }
        if (entry.isFallbackTransition) {
          player.onStart(() => eraseStyles(element, instruction.fromStyles));
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          skippedPlayers.push(player);
          return;
        }
        const timelines = [];
        instruction.timelines.forEach((tl) => {
          tl.stretchStartingKeyframe = true;
          if (!this.disabledNodes.has(tl.element)) {
            timelines.push(tl);
          }
        });
        instruction.timelines = timelines;
        subTimelines.append(element, instruction.timelines);
        const tuple = {
          instruction,
          player,
          element
        };
        queuedInstructions.push(tuple);
        instruction.queriedElements.forEach((element2) => getOrSetDefaultValue(queriedElements, element2, []).push(player));
        instruction.preStyleProps.forEach((stringMap, element2) => {
          if (stringMap.size) {
            let setVal = allPreStyleElements.get(element2);
            if (!setVal) {
              allPreStyleElements.set(element2, setVal = /* @__PURE__ */ new Set());
            }
            stringMap.forEach((_, prop) => setVal.add(prop));
          }
        });
        instruction.postStyleProps.forEach((stringMap, element2) => {
          let setVal = allPostStyleElements.get(element2);
          if (!setVal) {
            allPostStyleElements.set(element2, setVal = /* @__PURE__ */ new Set());
          }
          stringMap.forEach((_, prop) => setVal.add(prop));
        });
      });
    }
    if (erroneousTransitions.length) {
      const errors = [];
      erroneousTransitions.forEach((instruction) => {
        errors.push(transitionFailed(instruction.triggerName, instruction.errors));
      });
      allPlayers.forEach((player) => player.destroy());
      this.reportError(errors);
    }
    const allPreviousPlayersMap = /* @__PURE__ */ new Map();
    const animationElementMap = /* @__PURE__ */ new Map();
    queuedInstructions.forEach((entry) => {
      const element = entry.element;
      if (subTimelines.has(element)) {
        animationElementMap.set(element, element);
        this._beforeAnimationBuild(entry.player.namespaceId, entry.instruction, allPreviousPlayersMap);
      }
    });
    skippedPlayers.forEach((player) => {
      const element = player.element;
      const previousPlayers = this._getPreviousPlayers(element, false, player.namespaceId, player.triggerName, null);
      previousPlayers.forEach((prevPlayer) => {
        getOrSetDefaultValue(allPreviousPlayersMap, element, []).push(prevPlayer);
        prevPlayer.destroy();
      });
    });
    const replaceNodes = allLeaveNodes.filter((node) => {
      return replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements);
    });
    const postStylesMap = /* @__PURE__ */ new Map();
    const allLeaveQueriedNodes = cloakAndComputeStyles(postStylesMap, this.driver, leaveNodesWithoutAnimations, allPostStyleElements, AUTO_STYLE);
    allLeaveQueriedNodes.forEach((node) => {
      if (replacePostStylesAsPre(node, allPreStyleElements, allPostStyleElements)) {
        replaceNodes.push(node);
      }
    });
    const preStylesMap = /* @__PURE__ */ new Map();
    enterNodeMap.forEach((nodes, root) => {
      cloakAndComputeStyles(preStylesMap, this.driver, new Set(nodes), allPreStyleElements, \u0275PRE_STYLE);
    });
    replaceNodes.forEach((node) => {
      const post = postStylesMap.get(node);
      const pre = preStylesMap.get(node);
      postStylesMap.set(node, new Map([...post?.entries() ?? [], ...pre?.entries() ?? []]));
    });
    const rootPlayers = [];
    const subPlayers = [];
    const NO_PARENT_ANIMATION_ELEMENT_DETECTED = {};
    queuedInstructions.forEach((entry) => {
      const {
        element,
        player,
        instruction
      } = entry;
      if (subTimelines.has(element)) {
        if (disabledElementsSet.has(element)) {
          player.onDestroy(() => setStyles(element, instruction.toStyles));
          player.disabled = true;
          player.overrideTotalTime(instruction.totalTime);
          skippedPlayers.push(player);
          return;
        }
        let parentWithAnimation = NO_PARENT_ANIMATION_ELEMENT_DETECTED;
        if (animationElementMap.size > 1) {
          let elm = element;
          const parentsToAdd = [];
          while (elm = elm.parentNode) {
            const detectedParent = animationElementMap.get(elm);
            if (detectedParent) {
              parentWithAnimation = detectedParent;
              break;
            }
            parentsToAdd.push(elm);
          }
          parentsToAdd.forEach((parent) => animationElementMap.set(parent, parentWithAnimation));
        }
        const innerPlayer = this._buildAnimation(player.namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap);
        player.setRealPlayer(innerPlayer);
        if (parentWithAnimation === NO_PARENT_ANIMATION_ELEMENT_DETECTED) {
          rootPlayers.push(player);
        } else {
          const parentPlayers = this.playersByElement.get(parentWithAnimation);
          if (parentPlayers && parentPlayers.length) {
            player.parentPlayer = optimizeGroupPlayer(parentPlayers);
          }
          skippedPlayers.push(player);
        }
      } else {
        eraseStyles(element, instruction.fromStyles);
        player.onDestroy(() => setStyles(element, instruction.toStyles));
        subPlayers.push(player);
        if (disabledElementsSet.has(element)) {
          skippedPlayers.push(player);
        }
      }
    });
    subPlayers.forEach((player) => {
      const playersForElement = skippedPlayersMap.get(player.element);
      if (playersForElement && playersForElement.length) {
        const innerPlayer = optimizeGroupPlayer(playersForElement);
        player.setRealPlayer(innerPlayer);
      }
    });
    skippedPlayers.forEach((player) => {
      if (player.parentPlayer) {
        player.syncPlayerEvents(player.parentPlayer);
      } else {
        player.destroy();
      }
    });
    for (let i2 = 0; i2 < allLeaveNodes.length; i2++) {
      const element = allLeaveNodes[i2];
      const details = element[REMOVAL_FLAG];
      removeClass(element, LEAVE_CLASSNAME);
      if (details && details.hasAnimation)
        continue;
      let players = [];
      if (queriedElements.size) {
        let queriedPlayerResults = queriedElements.get(element);
        if (queriedPlayerResults && queriedPlayerResults.length) {
          players.push(...queriedPlayerResults);
        }
        let queriedInnerElements = this.driver.query(element, NG_ANIMATING_SELECTOR, true);
        for (let j = 0; j < queriedInnerElements.length; j++) {
          let queriedPlayers = queriedElements.get(queriedInnerElements[j]);
          if (queriedPlayers && queriedPlayers.length) {
            players.push(...queriedPlayers);
          }
        }
      }
      const activePlayers = players.filter((p) => !p.destroyed);
      if (activePlayers.length) {
        removeNodesAfterAnimationDone(this, element, activePlayers);
      } else {
        this.processLeaveNode(element);
      }
    }
    allLeaveNodes.length = 0;
    rootPlayers.forEach((player) => {
      this.players.push(player);
      player.onDone(() => {
        player.destroy();
        const index = this.players.indexOf(player);
        this.players.splice(index, 1);
      });
      player.play();
    });
    return rootPlayers;
  }
  afterFlush(callback) {
    this._flushFns.push(callback);
  }
  afterFlushAnimationsDone(callback) {
    this._whenQuietFns.push(callback);
  }
  _getPreviousPlayers(element, isQueriedElement, namespaceId, triggerName, toStateValue) {
    let players = [];
    if (isQueriedElement) {
      const queriedElementPlayers = this.playersByQueriedElement.get(element);
      if (queriedElementPlayers) {
        players = queriedElementPlayers;
      }
    } else {
      const elementPlayers = this.playersByElement.get(element);
      if (elementPlayers) {
        const isRemovalAnimation = !toStateValue || toStateValue == VOID_VALUE;
        elementPlayers.forEach((player) => {
          if (player.queued)
            return;
          if (!isRemovalAnimation && player.triggerName != triggerName)
            return;
          players.push(player);
        });
      }
    }
    if (namespaceId || triggerName) {
      players = players.filter((player) => {
        if (namespaceId && namespaceId != player.namespaceId)
          return false;
        if (triggerName && triggerName != player.triggerName)
          return false;
        return true;
      });
    }
    return players;
  }
  _beforeAnimationBuild(namespaceId, instruction, allPreviousPlayersMap) {
    const triggerName = instruction.triggerName;
    const rootElement = instruction.element;
    const targetNameSpaceId = instruction.isRemovalTransition ? void 0 : namespaceId;
    const targetTriggerName = instruction.isRemovalTransition ? void 0 : triggerName;
    for (const timelineInstruction of instruction.timelines) {
      const element = timelineInstruction.element;
      const isQueriedElement = element !== rootElement;
      const players = getOrSetDefaultValue(allPreviousPlayersMap, element, []);
      const previousPlayers = this._getPreviousPlayers(element, isQueriedElement, targetNameSpaceId, targetTriggerName, instruction.toState);
      previousPlayers.forEach((player) => {
        const realPlayer = player.getRealPlayer();
        if (realPlayer.beforeDestroy) {
          realPlayer.beforeDestroy();
        }
        player.destroy();
        players.push(player);
      });
    }
    eraseStyles(rootElement, instruction.fromStyles);
  }
  _buildAnimation(namespaceId, instruction, allPreviousPlayersMap, skippedPlayersMap, preStylesMap, postStylesMap) {
    const triggerName = instruction.triggerName;
    const rootElement = instruction.element;
    const allQueriedPlayers = [];
    const allConsumedElements = /* @__PURE__ */ new Set();
    const allSubElements = /* @__PURE__ */ new Set();
    const allNewPlayers = instruction.timelines.map((timelineInstruction) => {
      const element = timelineInstruction.element;
      allConsumedElements.add(element);
      const details = element[REMOVAL_FLAG];
      if (details && details.removedBeforeQueried)
        return new NoopAnimationPlayer(timelineInstruction.duration, timelineInstruction.delay);
      const isQueriedElement = element !== rootElement;
      const previousPlayers = flattenGroupPlayers((allPreviousPlayersMap.get(element) || EMPTY_PLAYER_ARRAY).map((p) => p.getRealPlayer())).filter((p) => {
        const pp = p;
        return pp.element ? pp.element === element : false;
      });
      const preStyles = preStylesMap.get(element);
      const postStyles = postStylesMap.get(element);
      const keyframes = normalizeKeyframes$1(this._normalizer, timelineInstruction.keyframes, preStyles, postStyles);
      const player2 = this._buildPlayer(timelineInstruction, keyframes, previousPlayers);
      if (timelineInstruction.subTimeline && skippedPlayersMap) {
        allSubElements.add(element);
      }
      if (isQueriedElement) {
        const wrappedPlayer = new TransitionAnimationPlayer(namespaceId, triggerName, element);
        wrappedPlayer.setRealPlayer(player2);
        allQueriedPlayers.push(wrappedPlayer);
      }
      return player2;
    });
    allQueriedPlayers.forEach((player2) => {
      getOrSetDefaultValue(this.playersByQueriedElement, player2.element, []).push(player2);
      player2.onDone(() => deleteOrUnsetInMap(this.playersByQueriedElement, player2.element, player2));
    });
    allConsumedElements.forEach((element) => addClass(element, NG_ANIMATING_CLASSNAME));
    const player = optimizeGroupPlayer(allNewPlayers);
    player.onDestroy(() => {
      allConsumedElements.forEach((element) => removeClass(element, NG_ANIMATING_CLASSNAME));
      setStyles(rootElement, instruction.toStyles);
    });
    allSubElements.forEach((element) => {
      getOrSetDefaultValue(skippedPlayersMap, element, []).push(player);
    });
    return player;
  }
  _buildPlayer(instruction, keyframes, previousPlayers) {
    if (keyframes.length > 0) {
      return this.driver.animate(instruction.element, keyframes, instruction.duration, instruction.delay, instruction.easing, previousPlayers);
    }
    return new NoopAnimationPlayer(instruction.duration, instruction.delay);
  }
};
var TransitionAnimationPlayer = class {
  constructor(namespaceId, triggerName, element) {
    this.namespaceId = namespaceId;
    this.triggerName = triggerName;
    this.element = element;
    this._player = new NoopAnimationPlayer();
    this._containsRealPlayer = false;
    this._queuedCallbacks = /* @__PURE__ */ new Map();
    this.destroyed = false;
    this.parentPlayer = null;
    this.markedForDestroy = false;
    this.disabled = false;
    this.queued = true;
    this.totalTime = 0;
  }
  setRealPlayer(player) {
    if (this._containsRealPlayer)
      return;
    this._player = player;
    this._queuedCallbacks.forEach((callbacks, phase) => {
      callbacks.forEach((callback) => listenOnPlayer(player, phase, void 0, callback));
    });
    this._queuedCallbacks.clear();
    this._containsRealPlayer = true;
    this.overrideTotalTime(player.totalTime);
    this.queued = false;
  }
  getRealPlayer() {
    return this._player;
  }
  overrideTotalTime(totalTime) {
    this.totalTime = totalTime;
  }
  syncPlayerEvents(player) {
    const p = this._player;
    if (p.triggerCallback) {
      player.onStart(() => p.triggerCallback("start"));
    }
    player.onDone(() => this.finish());
    player.onDestroy(() => this.destroy());
  }
  _queueEvent(name, callback) {
    getOrSetDefaultValue(this._queuedCallbacks, name, []).push(callback);
  }
  onDone(fn) {
    if (this.queued) {
      this._queueEvent("done", fn);
    }
    this._player.onDone(fn);
  }
  onStart(fn) {
    if (this.queued) {
      this._queueEvent("start", fn);
    }
    this._player.onStart(fn);
  }
  onDestroy(fn) {
    if (this.queued) {
      this._queueEvent("destroy", fn);
    }
    this._player.onDestroy(fn);
  }
  init() {
    this._player.init();
  }
  hasStarted() {
    return this.queued ? false : this._player.hasStarted();
  }
  play() {
    !this.queued && this._player.play();
  }
  pause() {
    !this.queued && this._player.pause();
  }
  restart() {
    !this.queued && this._player.restart();
  }
  finish() {
    this._player.finish();
  }
  destroy() {
    this.destroyed = true;
    this._player.destroy();
  }
  reset() {
    !this.queued && this._player.reset();
  }
  setPosition(p) {
    if (!this.queued) {
      this._player.setPosition(p);
    }
  }
  getPosition() {
    return this.queued ? 0 : this._player.getPosition();
  }
  /** @internal */
  triggerCallback(phaseName) {
    const p = this._player;
    if (p.triggerCallback) {
      p.triggerCallback(phaseName);
    }
  }
};
function deleteOrUnsetInMap(map2, key, value) {
  let currentValues = map2.get(key);
  if (currentValues) {
    if (currentValues.length) {
      const index = currentValues.indexOf(value);
      currentValues.splice(index, 1);
    }
    if (currentValues.length == 0) {
      map2.delete(key);
    }
  }
  return currentValues;
}
function normalizeTriggerValue(value) {
  return value != null ? value : null;
}
function isElementNode(node) {
  return node && node["nodeType"] === 1;
}
function isTriggerEventValid(eventName) {
  return eventName == "start" || eventName == "done";
}
function cloakElement(element, value) {
  const oldValue = element.style.display;
  element.style.display = value != null ? value : "none";
  return oldValue;
}
function cloakAndComputeStyles(valuesMap, driver, elements, elementPropsMap, defaultStyle) {
  const cloakVals = [];
  elements.forEach((element) => cloakVals.push(cloakElement(element)));
  const failedElements = [];
  elementPropsMap.forEach((props, element) => {
    const styles = /* @__PURE__ */ new Map();
    props.forEach((prop) => {
      const value = driver.computeStyle(element, prop, defaultStyle);
      styles.set(prop, value);
      if (!value || value.length == 0) {
        element[REMOVAL_FLAG] = NULL_REMOVED_QUERIED_STATE;
        failedElements.push(element);
      }
    });
    valuesMap.set(element, styles);
  });
  let i = 0;
  elements.forEach((element) => cloakElement(element, cloakVals[i++]));
  return failedElements;
}
function buildRootMap(roots, nodes) {
  const rootMap = /* @__PURE__ */ new Map();
  roots.forEach((root) => rootMap.set(root, []));
  if (nodes.length == 0)
    return rootMap;
  const NULL_NODE = 1;
  const nodeSet = new Set(nodes);
  const localRootMap = /* @__PURE__ */ new Map();
  function getRoot(node) {
    if (!node)
      return NULL_NODE;
    let root = localRootMap.get(node);
    if (root)
      return root;
    const parent = node.parentNode;
    if (rootMap.has(parent)) {
      root = parent;
    } else if (nodeSet.has(parent)) {
      root = NULL_NODE;
    } else {
      root = getRoot(parent);
    }
    localRootMap.set(node, root);
    return root;
  }
  nodes.forEach((node) => {
    const root = getRoot(node);
    if (root !== NULL_NODE) {
      rootMap.get(root).push(node);
    }
  });
  return rootMap;
}
function addClass(element, className) {
  element.classList?.add(className);
}
function removeClass(element, className) {
  element.classList?.remove(className);
}
function removeNodesAfterAnimationDone(engine, element, players) {
  optimizeGroupPlayer(players).onDone(() => engine.processLeaveNode(element));
}
function flattenGroupPlayers(players) {
  const finalPlayers = [];
  _flattenGroupPlayersRecur(players, finalPlayers);
  return finalPlayers;
}
function _flattenGroupPlayersRecur(players, finalPlayers) {
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    if (player instanceof AnimationGroupPlayer) {
      _flattenGroupPlayersRecur(player.players, finalPlayers);
    } else {
      finalPlayers.push(player);
    }
  }
}
function objEquals(a, b) {
  const k1 = Object.keys(a);
  const k2 = Object.keys(b);
  if (k1.length != k2.length)
    return false;
  for (let i = 0; i < k1.length; i++) {
    const prop = k1[i];
    if (!b.hasOwnProperty(prop) || a[prop] !== b[prop])
      return false;
  }
  return true;
}
function replacePostStylesAsPre(element, allPreStyleElements, allPostStyleElements) {
  const postEntry = allPostStyleElements.get(element);
  if (!postEntry)
    return false;
  let preEntry = allPreStyleElements.get(element);
  if (preEntry) {
    postEntry.forEach((data) => preEntry.add(data));
  } else {
    allPreStyleElements.set(element, postEntry);
  }
  allPostStyleElements.delete(element);
  return true;
}
var AnimationEngine = class {
  constructor(doc, _driver, _normalizer, scheduler) {
    this._driver = _driver;
    this._normalizer = _normalizer;
    this._triggerCache = {};
    this.onRemovalComplete = (element, context) => {
    };
    this._transitionEngine = new TransitionAnimationEngine(doc.body, _driver, _normalizer, scheduler);
    this._timelineEngine = new TimelineAnimationEngine(doc.body, _driver, _normalizer);
    this._transitionEngine.onRemovalComplete = (element, context) => this.onRemovalComplete(element, context);
  }
  registerTrigger(componentId, namespaceId, hostElement, name, metadata) {
    const cacheKey = componentId + "-" + name;
    let trigger = this._triggerCache[cacheKey];
    if (!trigger) {
      const errors = [];
      const warnings = [];
      const ast = buildAnimationAst(this._driver, metadata, errors, warnings);
      if (errors.length) {
        throw triggerBuildFailed(name, errors);
      }
      if (warnings.length) {
        warnTriggerBuild(name, warnings);
      }
      trigger = buildTrigger(name, ast, this._normalizer);
      this._triggerCache[cacheKey] = trigger;
    }
    this._transitionEngine.registerTrigger(namespaceId, name, trigger);
  }
  register(namespaceId, hostElement) {
    this._transitionEngine.register(namespaceId, hostElement);
  }
  destroy(namespaceId, context) {
    this._transitionEngine.destroy(namespaceId, context);
  }
  onInsert(namespaceId, element, parent, insertBefore) {
    this._transitionEngine.insertNode(namespaceId, element, parent, insertBefore);
  }
  onRemove(namespaceId, element, context) {
    this._transitionEngine.removeNode(namespaceId, element, context);
  }
  disableAnimations(element, disable) {
    this._transitionEngine.markElementAsDisabled(element, disable);
  }
  process(namespaceId, element, property, value) {
    if (property.charAt(0) == "@") {
      const [id, action] = parseTimelineCommand(property);
      const args = value;
      this._timelineEngine.command(id, element, action, args);
    } else {
      this._transitionEngine.trigger(namespaceId, element, property, value);
    }
  }
  listen(namespaceId, element, eventName, eventPhase, callback) {
    if (eventName.charAt(0) == "@") {
      const [id, action] = parseTimelineCommand(eventName);
      return this._timelineEngine.listen(id, element, action, callback);
    }
    return this._transitionEngine.listen(namespaceId, element, eventName, eventPhase, callback);
  }
  flush(microtaskId = -1) {
    this._transitionEngine.flush(microtaskId);
  }
  get players() {
    return [...this._transitionEngine.players, ...this._timelineEngine.players];
  }
  whenRenderingDone() {
    return this._transitionEngine.whenRenderingDone();
  }
  afterFlushAnimationsDone(cb) {
    this._transitionEngine.afterFlushAnimationsDone(cb);
  }
};
function packageNonAnimatableStyles(element, styles) {
  let startStyles = null;
  let endStyles = null;
  if (Array.isArray(styles) && styles.length) {
    startStyles = filterNonAnimatableStyles(styles[0]);
    if (styles.length > 1) {
      endStyles = filterNonAnimatableStyles(styles[styles.length - 1]);
    }
  } else if (styles instanceof Map) {
    startStyles = filterNonAnimatableStyles(styles);
  }
  return startStyles || endStyles ? new SpecialCasedStyles(element, startStyles, endStyles) : null;
}
var SpecialCasedStyles = class _SpecialCasedStyles {
  static {
    this.initialStylesByElement = /* @__PURE__ */ new WeakMap();
  }
  constructor(_element, _startStyles, _endStyles) {
    this._element = _element;
    this._startStyles = _startStyles;
    this._endStyles = _endStyles;
    this._state = 0;
    let initialStyles = _SpecialCasedStyles.initialStylesByElement.get(_element);
    if (!initialStyles) {
      _SpecialCasedStyles.initialStylesByElement.set(_element, initialStyles = /* @__PURE__ */ new Map());
    }
    this._initialStyles = initialStyles;
  }
  start() {
    if (this._state < 1) {
      if (this._startStyles) {
        setStyles(this._element, this._startStyles, this._initialStyles);
      }
      this._state = 1;
    }
  }
  finish() {
    this.start();
    if (this._state < 2) {
      setStyles(this._element, this._initialStyles);
      if (this._endStyles) {
        setStyles(this._element, this._endStyles);
        this._endStyles = null;
      }
      this._state = 1;
    }
  }
  destroy() {
    this.finish();
    if (this._state < 3) {
      _SpecialCasedStyles.initialStylesByElement.delete(this._element);
      if (this._startStyles) {
        eraseStyles(this._element, this._startStyles);
        this._endStyles = null;
      }
      if (this._endStyles) {
        eraseStyles(this._element, this._endStyles);
        this._endStyles = null;
      }
      setStyles(this._element, this._initialStyles);
      this._state = 3;
    }
  }
};
function filterNonAnimatableStyles(styles) {
  let result = null;
  styles.forEach((val, prop) => {
    if (isNonAnimatableStyle(prop)) {
      result = result || /* @__PURE__ */ new Map();
      result.set(prop, val);
    }
  });
  return result;
}
function isNonAnimatableStyle(prop) {
  return prop === "display" || prop === "position";
}
var WebAnimationsPlayer = class {
  constructor(element, keyframes, options, _specialStyles) {
    this.element = element;
    this.keyframes = keyframes;
    this.options = options;
    this._specialStyles = _specialStyles;
    this._onDoneFns = [];
    this._onStartFns = [];
    this._onDestroyFns = [];
    this._initialized = false;
    this._finished = false;
    this._started = false;
    this._destroyed = false;
    this._originalOnDoneFns = [];
    this._originalOnStartFns = [];
    this.time = 0;
    this.parentPlayer = null;
    this.currentSnapshot = /* @__PURE__ */ new Map();
    this._duration = options["duration"];
    this._delay = options["delay"] || 0;
    this.time = this._duration + this._delay;
  }
  _onFinish() {
    if (!this._finished) {
      this._finished = true;
      this._onDoneFns.forEach((fn) => fn());
      this._onDoneFns = [];
    }
  }
  init() {
    this._buildPlayer();
    this._preparePlayerBeforeStart();
  }
  _buildPlayer() {
    if (this._initialized)
      return;
    this._initialized = true;
    const keyframes = this.keyframes;
    this.domPlayer = this._triggerWebAnimation(this.element, keyframes, this.options);
    this._finalKeyframe = keyframes.length ? keyframes[keyframes.length - 1] : /* @__PURE__ */ new Map();
    const onFinish = () => this._onFinish();
    this.domPlayer.addEventListener("finish", onFinish);
    this.onDestroy(() => {
      this.domPlayer.removeEventListener("finish", onFinish);
    });
  }
  _preparePlayerBeforeStart() {
    if (this._delay) {
      this._resetDomPlayerState();
    } else {
      this.domPlayer.pause();
    }
  }
  _convertKeyframesToObject(keyframes) {
    const kfs = [];
    keyframes.forEach((frame) => {
      kfs.push(Object.fromEntries(frame));
    });
    return kfs;
  }
  /** @internal */
  _triggerWebAnimation(element, keyframes, options) {
    return element.animate(this._convertKeyframesToObject(keyframes), options);
  }
  onStart(fn) {
    this._originalOnStartFns.push(fn);
    this._onStartFns.push(fn);
  }
  onDone(fn) {
    this._originalOnDoneFns.push(fn);
    this._onDoneFns.push(fn);
  }
  onDestroy(fn) {
    this._onDestroyFns.push(fn);
  }
  play() {
    this._buildPlayer();
    if (!this.hasStarted()) {
      this._onStartFns.forEach((fn) => fn());
      this._onStartFns = [];
      this._started = true;
      if (this._specialStyles) {
        this._specialStyles.start();
      }
    }
    this.domPlayer.play();
  }
  pause() {
    this.init();
    this.domPlayer.pause();
  }
  finish() {
    this.init();
    if (this._specialStyles) {
      this._specialStyles.finish();
    }
    this._onFinish();
    this.domPlayer.finish();
  }
  reset() {
    this._resetDomPlayerState();
    this._destroyed = false;
    this._finished = false;
    this._started = false;
    this._onStartFns = this._originalOnStartFns;
    this._onDoneFns = this._originalOnDoneFns;
  }
  _resetDomPlayerState() {
    if (this.domPlayer) {
      this.domPlayer.cancel();
    }
  }
  restart() {
    this.reset();
    this.play();
  }
  hasStarted() {
    return this._started;
  }
  destroy() {
    if (!this._destroyed) {
      this._destroyed = true;
      this._resetDomPlayerState();
      this._onFinish();
      if (this._specialStyles) {
        this._specialStyles.destroy();
      }
      this._onDestroyFns.forEach((fn) => fn());
      this._onDestroyFns = [];
    }
  }
  setPosition(p) {
    if (this.domPlayer === void 0) {
      this.init();
    }
    this.domPlayer.currentTime = p * this.time;
  }
  getPosition() {
    return +(this.domPlayer.currentTime ?? 0) / this.time;
  }
  get totalTime() {
    return this._delay + this._duration;
  }
  beforeDestroy() {
    const styles = /* @__PURE__ */ new Map();
    if (this.hasStarted()) {
      const finalKeyframe = this._finalKeyframe;
      finalKeyframe.forEach((val, prop) => {
        if (prop !== "offset") {
          styles.set(prop, this._finished ? val : computeStyle(this.element, prop));
        }
      });
    }
    this.currentSnapshot = styles;
  }
  /** @internal */
  triggerCallback(phaseName) {
    const methods = phaseName === "start" ? this._onStartFns : this._onDoneFns;
    methods.forEach((fn) => fn());
    methods.length = 0;
  }
};
var WebAnimationsDriver = class {
  validateStyleProperty(prop) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      return validateStyleProperty(prop);
    }
    return true;
  }
  validateAnimatableStyleProperty(prop) {
    if (typeof ngDevMode === "undefined" || ngDevMode) {
      const cssProp = camelCaseToDashCase(prop);
      return validateWebAnimatableStyleProperty(cssProp);
    }
    return true;
  }
  matchesElement(_element, _selector) {
    return false;
  }
  containsElement(elm1, elm2) {
    return containsElement(elm1, elm2);
  }
  getParentElement(element) {
    return getParentElement(element);
  }
  query(element, selector, multi) {
    return invokeQuery(element, selector, multi);
  }
  computeStyle(element, prop, defaultValue) {
    return computeStyle(element, prop);
  }
  animate(element, keyframes, duration, delay, easing, previousPlayers = []) {
    const fill = delay == 0 ? "both" : "forwards";
    const playerOptions = {
      duration,
      delay,
      fill
    };
    if (easing) {
      playerOptions["easing"] = easing;
    }
    const previousStyles = /* @__PURE__ */ new Map();
    const previousWebAnimationPlayers = previousPlayers.filter((player) => player instanceof WebAnimationsPlayer);
    if (allowPreviousPlayerStylesMerge(duration, delay)) {
      previousWebAnimationPlayers.forEach((player) => {
        player.currentSnapshot.forEach((val, prop) => previousStyles.set(prop, val));
      });
    }
    let _keyframes = normalizeKeyframes(keyframes).map((styles) => new Map(styles));
    _keyframes = balancePreviousStylesIntoKeyframes(element, _keyframes, previousStyles);
    const specialStyles = packageNonAnimatableStyles(element, _keyframes);
    return new WebAnimationsPlayer(element, _keyframes, playerOptions, specialStyles);
  }
};
var ANIMATION_PREFIX = "@";
var DISABLE_ANIMATIONS_FLAG = "@.disabled";
var BaseAnimationRenderer = class {
  constructor(namespaceId, delegate, engine, _onDestroy) {
    this.namespaceId = namespaceId;
    this.delegate = delegate;
    this.engine = engine;
    this._onDestroy = _onDestroy;
    this.\u0275type = 0;
  }
  get data() {
    return this.delegate.data;
  }
  destroyNode(node) {
    this.delegate.destroyNode?.(node);
  }
  destroy() {
    this.engine.destroy(this.namespaceId, this.delegate);
    this.engine.afterFlushAnimationsDone(() => {
      queueMicrotask(() => {
        this.delegate.destroy();
      });
    });
    this._onDestroy?.();
  }
  createElement(name, namespace) {
    return this.delegate.createElement(name, namespace);
  }
  createComment(value) {
    return this.delegate.createComment(value);
  }
  createText(value) {
    return this.delegate.createText(value);
  }
  appendChild(parent, newChild) {
    this.delegate.appendChild(parent, newChild);
    this.engine.onInsert(this.namespaceId, newChild, parent, false);
  }
  insertBefore(parent, newChild, refChild, isMove = true) {
    this.delegate.insertBefore(parent, newChild, refChild);
    this.engine.onInsert(this.namespaceId, newChild, parent, isMove);
  }
  removeChild(parent, oldChild, isHostElement) {
    this.engine.onRemove(this.namespaceId, oldChild, this.delegate);
  }
  selectRootElement(selectorOrNode, preserveContent) {
    return this.delegate.selectRootElement(selectorOrNode, preserveContent);
  }
  parentNode(node) {
    return this.delegate.parentNode(node);
  }
  nextSibling(node) {
    return this.delegate.nextSibling(node);
  }
  setAttribute(el, name, value, namespace) {
    this.delegate.setAttribute(el, name, value, namespace);
  }
  removeAttribute(el, name, namespace) {
    this.delegate.removeAttribute(el, name, namespace);
  }
  addClass(el, name) {
    this.delegate.addClass(el, name);
  }
  removeClass(el, name) {
    this.delegate.removeClass(el, name);
  }
  setStyle(el, style2, value, flags) {
    this.delegate.setStyle(el, style2, value, flags);
  }
  removeStyle(el, style2, flags) {
    this.delegate.removeStyle(el, style2, flags);
  }
  setProperty(el, name, value) {
    if (name.charAt(0) == ANIMATION_PREFIX && name == DISABLE_ANIMATIONS_FLAG) {
      this.disableAnimations(el, !!value);
    } else {
      this.delegate.setProperty(el, name, value);
    }
  }
  setValue(node, value) {
    this.delegate.setValue(node, value);
  }
  listen(target, eventName, callback) {
    return this.delegate.listen(target, eventName, callback);
  }
  disableAnimations(element, value) {
    this.engine.disableAnimations(element, value);
  }
};
var AnimationRenderer = class extends BaseAnimationRenderer {
  constructor(factory, namespaceId, delegate, engine, onDestroy) {
    super(namespaceId, delegate, engine, onDestroy);
    this.factory = factory;
    this.namespaceId = namespaceId;
  }
  setProperty(el, name, value) {
    if (name.charAt(0) == ANIMATION_PREFIX) {
      if (name.charAt(1) == "." && name == DISABLE_ANIMATIONS_FLAG) {
        value = value === void 0 ? true : !!value;
        this.disableAnimations(el, value);
      } else {
        this.engine.process(this.namespaceId, el, name.slice(1), value);
      }
    } else {
      this.delegate.setProperty(el, name, value);
    }
  }
  listen(target, eventName, callback) {
    if (eventName.charAt(0) == ANIMATION_PREFIX) {
      const element = resolveElementFromTarget(target);
      let name = eventName.slice(1);
      let phase = "";
      if (name.charAt(0) != ANIMATION_PREFIX) {
        [name, phase] = parseTriggerCallbackName(name);
      }
      return this.engine.listen(this.namespaceId, element, name, phase, (event) => {
        const countId = event["_data"] || -1;
        this.factory.scheduleListenerCallback(countId, callback, event);
      });
    }
    return this.delegate.listen(target, eventName, callback);
  }
};
function resolveElementFromTarget(target) {
  switch (target) {
    case "body":
      return document.body;
    case "document":
      return document;
    case "window":
      return window;
    default:
      return target;
  }
}
function parseTriggerCallbackName(triggerName) {
  const dotIndex = triggerName.indexOf(".");
  const trigger = triggerName.substring(0, dotIndex);
  const phase = triggerName.slice(dotIndex + 1);
  return [trigger, phase];
}
var AnimationRendererFactory = class {
  constructor(delegate, engine, _zone) {
    this.delegate = delegate;
    this.engine = engine;
    this._zone = _zone;
    this._currentId = 0;
    this._microtaskId = 1;
    this._animationCallbacksBuffer = [];
    this._rendererCache = /* @__PURE__ */ new Map();
    this._cdRecurDepth = 0;
    engine.onRemovalComplete = (element, delegate2) => {
      const parentNode = delegate2?.parentNode(element);
      if (parentNode) {
        delegate2.removeChild(parentNode, element);
      }
    };
  }
  createRenderer(hostElement, type) {
    const EMPTY_NAMESPACE_ID = "";
    const delegate = this.delegate.createRenderer(hostElement, type);
    if (!hostElement || !type?.data?.["animation"]) {
      const cache = this._rendererCache;
      let renderer = cache.get(delegate);
      if (!renderer) {
        const onRendererDestroy = () => cache.delete(delegate);
        renderer = new BaseAnimationRenderer(EMPTY_NAMESPACE_ID, delegate, this.engine, onRendererDestroy);
        cache.set(delegate, renderer);
      }
      return renderer;
    }
    const componentId = type.id;
    const namespaceId = type.id + "-" + this._currentId;
    this._currentId++;
    this.engine.register(namespaceId, hostElement);
    const registerTrigger = (trigger) => {
      if (Array.isArray(trigger)) {
        trigger.forEach(registerTrigger);
      } else {
        this.engine.registerTrigger(componentId, namespaceId, hostElement, trigger.name, trigger);
      }
    };
    const animationTriggers = type.data["animation"];
    animationTriggers.forEach(registerTrigger);
    return new AnimationRenderer(this, namespaceId, delegate, this.engine);
  }
  begin() {
    this._cdRecurDepth++;
    if (this.delegate.begin) {
      this.delegate.begin();
    }
  }
  _scheduleCountTask() {
    queueMicrotask(() => {
      this._microtaskId++;
    });
  }
  /** @internal */
  scheduleListenerCallback(count, fn, data) {
    if (count >= 0 && count < this._microtaskId) {
      this._zone.run(() => fn(data));
      return;
    }
    const animationCallbacksBuffer = this._animationCallbacksBuffer;
    if (animationCallbacksBuffer.length == 0) {
      queueMicrotask(() => {
        this._zone.run(() => {
          animationCallbacksBuffer.forEach((tuple) => {
            const [fn2, data2] = tuple;
            fn2(data2);
          });
          this._animationCallbacksBuffer = [];
        });
      });
    }
    animationCallbacksBuffer.push([fn, data]);
  }
  end() {
    this._cdRecurDepth--;
    if (this._cdRecurDepth == 0) {
      this._zone.runOutsideAngular(() => {
        this._scheduleCountTask();
        this.engine.flush(this._microtaskId);
      });
    }
    if (this.delegate.end) {
      this.delegate.end();
    }
  }
  whenRenderingDone() {
    return this.engine.whenRenderingDone();
  }
};

// node_modules/@angular/platform-browser/fesm2022/animations.mjs
var InjectableAnimationEngine = class _InjectableAnimationEngine extends AnimationEngine {
  // The `ApplicationRef` is injected here explicitly to force the dependency ordering.
  // Since the `ApplicationRef` should be created earlier before the `AnimationEngine`, they
  // both have `ngOnDestroy` hooks and `flush()` must be called after all views are destroyed.
  constructor(doc, driver, normalizer) {
    super(doc, driver, normalizer, inject(ChangeDetectionScheduler, {
      optional: true
    }));
  }
  ngOnDestroy() {
    this.flush();
  }
  static {
    this.\u0275fac = function InjectableAnimationEngine_Factory(t) {
      return new (t || _InjectableAnimationEngine)(\u0275\u0275inject(DOCUMENT), \u0275\u0275inject(AnimationDriver), \u0275\u0275inject(AnimationStyleNormalizer));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({
      token: _InjectableAnimationEngine,
      factory: _InjectableAnimationEngine.\u0275fac
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(InjectableAnimationEngine, [{
    type: Injectable
  }], () => [{
    type: Document,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: AnimationDriver
  }, {
    type: AnimationStyleNormalizer
  }], null);
})();
function instantiateDefaultStyleNormalizer() {
  return new WebAnimationsStyleNormalizer();
}
function instantiateRendererFactory(renderer, engine, zone) {
  return new AnimationRendererFactory(renderer, engine, zone);
}
var SHARED_ANIMATION_PROVIDERS = [{
  provide: AnimationStyleNormalizer,
  useFactory: instantiateDefaultStyleNormalizer
}, {
  provide: AnimationEngine,
  useClass: InjectableAnimationEngine
}, {
  provide: RendererFactory2,
  useFactory: instantiateRendererFactory,
  deps: [DomRendererFactory2, AnimationEngine, NgZone]
}];
var BROWSER_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useFactory: () => new WebAnimationsDriver()
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: "BrowserAnimations"
}, ...SHARED_ANIMATION_PROVIDERS];
var BROWSER_NOOP_ANIMATIONS_PROVIDERS = [{
  provide: AnimationDriver,
  useClass: NoopAnimationDriver
}, {
  provide: ANIMATION_MODULE_TYPE,
  useValue: "NoopAnimations"
}, ...SHARED_ANIMATION_PROVIDERS];
var BrowserAnimationsModule = class _BrowserAnimationsModule {
  /**
   * Configures the module based on the specified object.
   *
   * @param config Object used to configure the behavior of the `BrowserAnimationsModule`.
   * @see {@link BrowserAnimationsModuleConfig}
   *
   * @usageNotes
   * When registering the `BrowserAnimationsModule`, you can use the `withConfig`
   * function as follows:
   * ```
   * @NgModule({
   *   imports: [BrowserAnimationsModule.withConfig(config)]
   * })
   * class MyNgModule {}
   * ```
   */
  static withConfig(config) {
    return {
      ngModule: _BrowserAnimationsModule,
      providers: config.disableAnimations ? BROWSER_NOOP_ANIMATIONS_PROVIDERS : BROWSER_ANIMATIONS_PROVIDERS
    };
  }
  static {
    this.\u0275fac = function BrowserAnimationsModule_Factory(t) {
      return new (t || _BrowserAnimationsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _BrowserAnimationsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: BROWSER_ANIMATIONS_PROVIDERS,
      imports: [BrowserModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BrowserAnimationsModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_ANIMATIONS_PROVIDERS
    }]
  }], null, null);
})();
function provideAnimations() {
  performanceMarkFeature("NgEagerAnimations");
  return [...BROWSER_ANIMATIONS_PROVIDERS];
}
var NoopAnimationsModule = class _NoopAnimationsModule {
  static {
    this.\u0275fac = function NoopAnimationsModule_Factory(t) {
      return new (t || _NoopAnimationsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _NoopAnimationsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS,
      imports: [BrowserModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NoopAnimationsModule, [{
    type: NgModule,
    args: [{
      exports: [BrowserModule],
      providers: BROWSER_NOOP_ANIMATIONS_PROVIDERS
    }]
  }], null, null);
})();

// src/app/home/home.component.ts
function HomeComponent_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 18)(1, "div", 19)(2, "div", 20);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(3, "svg", 21);
    \u0275\u0275element(4, "path", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 23);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 24);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275attribute("d", stat_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.value);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(stat_r1.label);
  }
}
function HomeComponent_div_27_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35);
    \u0275\u0275element(1, "div", 36);
    \u0275\u0275elementStart(2, "span", 37);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const feature_r5 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(feature_r5);
  }
}
function HomeComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275listener("click", function HomeComponent_div_27_Template_div_click_0_listener() {
      const module_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.handleModuleClick(module_r3));
    });
    \u0275\u0275elementStart(1, "div", 26);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 27);
    \u0275\u0275element(3, "path", 22);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "h3", 28);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 29);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 30);
    \u0275\u0275template(9, HomeComponent_div_27_div_9_Template, 4, 1, "div", 31);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 32);
    \u0275\u0275text(11, " Acceder al M\xF3dulo ");
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(12, "svg", 33);
    \u0275\u0275element(13, "path", 34);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const module_r3 = ctx.$implicit;
    const i_r6 = ctx.index;
    \u0275\u0275classProp("delay-100", i_r6 === 0)("delay-200", i_r6 === 1)("delay-300", i_r6 === 2);
    \u0275\u0275advance(3);
    \u0275\u0275attribute("d", module_r3.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(module_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(module_r3.subtitle);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", module_r3.features);
  }
}
var HomeComponent = class _HomeComponent {
  constructor(router) {
    this.router = router;
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.modules = [
      {
        id: "internal",
        title: "Servicios Administrativos",
        subtitle: "Tr\xE1mites institucionales y administrativos",
        icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
        gradient: "from-university-700 to-university-800",
        delay: 200,
        features: [
          "Autorizaciones oficiales",
          "Permisos especiales",
          "Documentaci\xF3n legal",
          "Registro de actividades"
        ]
      },
      {
        id: "search",
        title: "Consulta y Seguimiento",
        subtitle: "Sistema de b\xFAsqueda y monitoreo de tr\xE1mites",
        icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
        gradient: "from-university-500 to-university-600",
        delay: 300,
        features: [
          "Estado de solicitudes",
          "Historial de tr\xE1mites",
          "Notificaciones autom\xE1ticas",
          "Reportes personalizados"
        ]
      }
    ];
    this.stats = [
      { value: "98.5%", label: "Satisfacci\xF3n Usuario", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
      { value: "5,200+", label: "Tr\xE1mites Mensuales", icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
      { value: "24hrs", label: "Tiempo Promedio", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }
    ];
    this.activeModule = null;
  }
  ngOnInit() {
    this.initializeAnimations();
  }
  ngAfterViewInit() {
    this.initializeAnimations();
  }
  initializeAnimations() {
    if (typeof window !== "undefined" && "IntersectionObserver" in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      }, { threshold: 0.1 });
      setTimeout(() => {
        document.querySelectorAll(".observe-animation").forEach((el) => {
          observer.observe(el);
        });
      }, 100);
    }
  }
  setActiveModule(moduleId) {
    this.activeModule = moduleId;
  }
  handleModuleClick(module) {
    if (module.id === "search") {
      this.router.navigate(["/verificar"]);
    } else if (module.id === "external") {
      this.router.navigate(["/tramites-externos"]);
    } else if (module.id === "internal") {
      this.router.navigate(["/servicios-administrativos"]);
    } else {
    }
  }
  goToManual() {
    this.router.navigate(["/manual"]);
  }
  static {
    this.\u0275fac = function HomeComponent_Factory(t) {
      return new (t || _HomeComponent)(\u0275\u0275directiveInject(Router));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 28, vars: 2, consts: [[1, "relative", "py-20", "px-4", "bg-gradient-to-br", "from-university-50", "to-university-100"], [1, "max-w-6xl", "mx-auto"], [1, "text-center", "mb-16"], [1, "text-4xl", "md:text-5xl", "font-bold", "mb-6", "text-university-800", "animate-fade-in"], [1, "text-university-600"], [1, "text-xl", "text-gray-700", "mb-10", "max-w-3xl", "mx-auto", "animate-slide-up", "delay-100"], [1, "flex", "flex-col", "sm:flex-row", "gap-4", "justify-center", "animate-slide-up", "delay-200"], [1, "btn-outline-university", "px-8", "py-4", "rounded-lg", "font-semibold", "text-lg", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "inline-block", "w-5", "h-5", "ml-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"], [1, "py-12", "lg:py-16", "px-4", "bg-white"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "lg:grid-cols-3", "gap-6", "lg:gap-8", "mb-12", "lg:mb-16"], ["class", "bg-gradient-to-br from-white to-university-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-100 border border-university-100", 4, "ngFor", "ngForOf"], [1, "py-20", "px-4", "bg-gray-50"], [1, "text-3xl", "font-bold", "mb-4", "text-university-800"], [1, "text-xl", "text-gray-600"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6", "lg:gap-8", "max-w-4xl", "mx-auto"], ["class", "institutional-card rounded-xl p-6 lg:p-8 animate-fade-in cursor-pointer", 3, "delay-100", "delay-200", "delay-300", "click", 4, "ngFor", "ngForOf"], [1, "bg-gradient-to-br", "from-white", "to-university-50", "rounded-2xl", "p-6", "shadow-lg", "hover:shadow-xl", "transition-all", "duration-300", "animate-fade-in", "delay-100", "border", "border-university-100"], [1, "flex", "flex-col", "items-center", "text-center"], [1, "inline-flex", "items-center", "justify-center", "w-16", "h-16", "mb-4", "rounded-xl", "bg-university-100", "shadow-md"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-8", "h-8", "text-university-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2"], [1, "text-4xl", "md:text-5xl", "font-bold", "text-university-800", "mb-2"], [1, "text-sm", "md:text-base", "text-gray-600", "font-medium"], [1, "institutional-card", "rounded-xl", "p-6", "lg:p-8", "animate-fade-in", "cursor-pointer", 3, "click"], [1, "flex", "items-center", "justify-center", "w-16", "h-16", "mb-6", "rounded-xl", "university-gradient"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-8", "h-8", "text-white"], [1, "text-xl", "font-bold", "mb-3", "text-university-800"], [1, "text-gray-600", "mb-6"], [1, "space-y-3", "mb-6"], ["class", "flex items-center space-x-3 text-gray-700", 4, "ngFor", "ngForOf"], [1, "w-full", "btn-outline-university", "px-6", "py-3", "rounded-lg", "font-medium", "hover:shadow-md", "transition-all", "duration-300"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "inline-block", "w-4", "h-4", "ml-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "flex", "items-center", "space-x-3", "text-gray-700"], [1, "w-2", "h-2", "rounded-full", "bg-university-500", "flex-shrink-0"], [1, "text-sm"]], template: function HomeComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "h1", 3);
        \u0275\u0275text(4, " Plataforma de Gesti\xF3n ");
        \u0275\u0275element(5, "br");
        \u0275\u0275elementStart(6, "span", 4);
        \u0275\u0275text(7, "Documentaria Universitaria");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "p", 5);
        \u0275\u0275text(9, " Sistema integral para la administraci\xF3n eficiente de tr\xE1mites acad\xE9micos y administrativos de nuestra instituci\xF3n educativa p\xFAblica. ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(10, "div", 6)(11, "button", 7);
        \u0275\u0275listener("click", function HomeComponent_Template_button_click_11_listener() {
          return ctx.goToManual();
        });
        \u0275\u0275text(12, " Manual de Usuario ");
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(13, "svg", 8);
        \u0275\u0275element(14, "path", 9);
        \u0275\u0275elementEnd()()()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(15, "section", 10)(16, "div", 1)(17, "div", 11);
        \u0275\u0275template(18, HomeComponent_div_18_Template, 9, 3, "div", 12);
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(19, "section", 13)(20, "div", 1)(21, "div", 2)(22, "h2", 14);
        \u0275\u0275text(23, " M\xF3dulos del Sistema ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(24, "p", 15);
        \u0275\u0275text(25, "Herramientas especializadas para la gesti\xF3n acad\xE9mica y administrativa");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(26, "div", 16);
        \u0275\u0275template(27, HomeComponent_div_27_Template, 14, 10, "div", 17);
        \u0275\u0275elementEnd()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(18);
        \u0275\u0275property("ngForOf", ctx.stats);
        \u0275\u0275advance(9);
        \u0275\u0275property("ngForOf", ctx.modules);
      }
    }, dependencies: [CommonModule, NgForOf], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent" });
})();

// src/app/admin-login/admin-login.component.ts
function AdminLoginComponent_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 33);
    \u0275\u0275element(3, "path", 34);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "h3", 35);
    \u0275\u0275text(6, "\xA1Acceso autorizado!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 36);
    \u0275\u0275text(8, "Redirigiendo al panel administrativo...");
    \u0275\u0275elementEnd()()()();
  }
}
function AdminLoginComponent_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 32);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 38);
    \u0275\u0275element(3, "path", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "h3", 40);
    \u0275\u0275text(6, "Cambio de contrase\xF1a requerido");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 41);
    \u0275\u0275text(8, "Debes cambiar tu contrase\xF1a temporal antes de continuar.");
    \u0275\u0275elementEnd()()()();
  }
}
function AdminLoginComponent_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 32);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 43);
    \u0275\u0275element(3, "path", 44);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "h3", 45);
    \u0275\u0275text(6, "Error de acceso");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 46);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r0.loginError);
  }
}
function AdminLoginComponent_div_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("usuario"), " ");
  }
}
function AdminLoginComponent__svg_svg_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 48);
    \u0275\u0275element(1, "path", 49)(2, "path", 50);
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent__svg_svg_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 48);
    \u0275\u0275element(1, "path", 51);
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_div_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getFieldError("password"), " ");
  }
}
function AdminLoginComponent_span_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 53);
    \u0275\u0275element(2, "path", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Iniciar Sesi\xF3n ");
    \u0275\u0275elementEnd();
  }
}
function AdminLoginComponent_span_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275element(1, "div", 55);
    \u0275\u0275text(2, " Verificando credenciales... ");
    \u0275\u0275elementEnd();
  }
}
var AdminLoginComponent = class _AdminLoginComponent {
  constructor(fb, router, route, authService) {
    this.fb = fb;
    this.router = router;
    this.route = route;
    this.authService = authService;
    this.isLoading = false;
    this.showPassword = false;
    this.loginError = "";
    this.loginSuccess = false;
    this.mustChangePassword = false;
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    this.returnUrl = "/";
    this.loginForm = this.fb.group({
      usuario: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
      return;
    }
    const savedCredentials = this.getSavedCredentials();
    if (savedCredentials) {
      this.loginForm.patchValue({
        usuario: savedCredentials.usuario,
        rememberMe: true
      });
    }
  }
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = "";
      this.mustChangePassword = false;
      const { usuario, password, rememberMe } = this.loginForm.value;
      this.authService.login({ usuario, password }).subscribe({
        next: (response) => {
          if (rememberMe) {
            this.saveCredentials(usuario);
          } else {
            this.clearSavedCredentials();
          }
          this.isLoading = false;
          const redirectUrl = response?.data?.redirectUrl || response?.redirectUrl;
          if (redirectUrl) {
            console.log("Redirecting to:", redirectUrl);
            this.router.navigate([redirectUrl]);
          } else {
            console.warn("No redirectUrl in response, using role-based fallback");
            const roleRoutes = {
              "admin": "/admin/tablero",
              "administrativo": "/administrativo/tablero",
              "usuario": "/usuario/tablero",
              "estudiante": "/estudiante/tablero"
            };
            const userRole = response?.data?.usuario?.role?.name?.toLowerCase() || response?.usuario?.role?.name?.toLowerCase() || "";
            const route = roleRoutes[userRole] || "/";
            this.router.navigate([route]);
          }
        },
        error: (error) => {
          this.isLoading = false;
          if (error.status === 428) {
            this.mustChangePassword = true;
            this.loginError = "Debes cambiar tu contrase\xF1a temporal";
          } else if (error.status === 403) {
            this.loginError = error.error?.message || "Credenciales inv\xE1lidas o cuenta bloqueada";
          } else {
            this.loginError = "Error al iniciar sesi\xF3n. Intente nuevamente.";
          }
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }
  markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach((key) => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }
  saveCredentials(usuario) {
    try {
      localStorage.setItem("adminCredentials", JSON.stringify({ usuario }));
    } catch (e) {
    }
  }
  getSavedCredentials() {
    try {
      const saved = localStorage.getItem("adminCredentials");
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  }
  clearSavedCredentials() {
    try {
      localStorage.removeItem("adminCredentials");
    } catch (e) {
    }
  }
  getFieldError(fieldName) {
    const field = this.loginForm.get(fieldName);
    if (field?.invalid && field?.touched) {
      if (field.errors?.["required"]) {
        return `${this.getFieldLabel(fieldName)} es obligatorio`;
      }
      if (field.errors?.["minlength"]) {
        const requiredLength = field.errors?.["minlength"].requiredLength;
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    return "";
  }
  getFieldLabel(fieldName) {
    const labels = {
      "usuario": "El nombre de usuario",
      "password": "La contrase\xF1a"
    };
    return labels[fieldName] || fieldName;
  }
  isFieldInvalid(fieldName) {
    const field = this.loginForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }
  static {
    this.\u0275fac = function AdminLoginComponent_Factory(t) {
      return new (t || _AdminLoginComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AdminLoginComponent, selectors: [["app-admin-login"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 48, vars: 28, consts: [[1, "min-h-screen", "bg-gradient-to-br", "from-slate-900", "via-blue-900", "to-slate-900", "flex", "items-center", "justify-center", "px-4", "py-8"], [1, "max-w-md", "w-full"], [1, "text-center", "mb-8"], [1, "inline-flex", "items-center", "justify-center", "w-16", "h-16", "bg-white", "rounded-full", "shadow-lg", "mb-6"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-8", "h-8", "text-blue-600"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"], [1, "text-2xl", "md:text-3xl", "font-bold", "text-white", "mb-2"], [1, "text-slate-300"], [1, "bg-white", "rounded-2xl", "shadow-2xl", "p-8", "backdrop-blur-sm", "bg-opacity-95"], ["class", "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in", 4, "ngIf"], ["class", "mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg", 4, "ngIf"], ["class", "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-shake", 4, "ngIf"], [1, "space-y-6", 3, "ngSubmit", "formGroup"], [1, "block", "text-sm", "font-medium", "text-gray-700", "mb-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "inline-block", "w-4", "h-4", "mr-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"], [1, "relative"], ["type", "text", "formControlName", "usuario", "placeholder", "Ingresa tu nombre de usuario", "autocomplete", "username", 1, "w-full", "px-4", "py-3", "border-2", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "transition-all", "duration-300", "pl-12"], [1, "absolute", "left-4", "top-1/2", "transform", "-translate-y-1/2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-gray-400"], ["class", "mt-2 text-sm text-red-600 animate-slide-down", 4, "ngIf"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"], ["formControlName", "password", "placeholder", "Ingresa tu credenciales", "autocomplete", "current-password", 1, "w-full", "px-4", "py-3", "border-2", "rounded-lg", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", "transition-all", "duration-300", "pl-12", "pr-12", 3, "type"], ["type", "button", 1, "absolute", "right-4", "top-1/2", "transform", "-translate-y-1/2", "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click", "disabled"], ["class", "w-5 h-5", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center"], ["type", "checkbox", "formControlName", "rememberMe", 1, "w-4", "h-4", "text-blue-600", "bg-gray-100", "border-gray-300", "rounded", "focus:ring-blue-500", "focus:ring-2", "transition-all", "duration-300"], [1, "ml-2", "text-sm", "text-gray-700"], ["type", "submit", 1, "w-full", "bg-gradient-to-r", "from-blue-600", "to-blue-700", "text-white", "py-3", "px-4", "rounded-lg", "font-medium", "text-lg", "shadow-lg", "hover:from-blue-700", "hover:to-blue-800", "focus:ring-4", "focus:ring-blue-300", "transition-all", "duration-300", "disabled:opacity-50", "disabled:cursor-not-allowed", "transform", "hover:scale-[1.02]", "active:scale-[0.98]", 3, "disabled"], ["class", "flex items-center justify-center", 4, "ngIf"], [1, "mb-6", "p-4", "bg-green-50", "border", "border-green-200", "rounded-lg", "animate-fade-in"], [1, "flex", "items-center", "space-x-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-500", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-medium", "text-green-800"], [1, "text-sm", "text-green-700"], [1, "mb-6", "p-4", "bg-yellow-50", "border", "border-yellow-200", "rounded-lg"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-yellow-500", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"], [1, "text-sm", "font-medium", "text-yellow-800"], [1, "text-sm", "text-yellow-700"], [1, "mb-6", "p-4", "bg-red-50", "border", "border-red-200", "rounded-lg", "animate-shake"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-red-500", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "text-sm", "font-medium", "text-red-800"], [1, "text-sm", "text-red-700"], [1, "mt-2", "text-sm", "text-red-600", "animate-slide-down"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"], [1, "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"], [1, "w-5", "h-5", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin", "mr-2"]], template: function AdminLoginComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(4, "svg", 4);
        \u0275\u0275element(5, "path", 5);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(6, "h1", 6);
        \u0275\u0275text(7, " Panel Administrativo ");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(8, "p", 7);
        \u0275\u0275text(9, " Acceso para personal autorizado de UNTUMBES ");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(10, "div", 8);
        \u0275\u0275template(11, AdminLoginComponent_div_11_Template, 9, 0, "div", 9)(12, AdminLoginComponent_div_12_Template, 9, 0, "div", 10)(13, AdminLoginComponent_div_13_Template, 9, 1, "div", 11);
        \u0275\u0275elementStart(14, "form", 12);
        \u0275\u0275listener("ngSubmit", function AdminLoginComponent_Template_form_ngSubmit_14_listener() {
          return ctx.onSubmit();
        });
        \u0275\u0275elementStart(15, "div")(16, "label", 13);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(17, "svg", 14);
        \u0275\u0275element(18, "path", 15);
        \u0275\u0275elementEnd();
        \u0275\u0275text(19, " Usuario ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(20, "div", 16);
        \u0275\u0275element(21, "input", 17);
        \u0275\u0275elementStart(22, "div", 18);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(23, "svg", 19);
        \u0275\u0275element(24, "path", 15);
        \u0275\u0275elementEnd()()();
        \u0275\u0275template(25, AdminLoginComponent_div_25_Template, 2, 1, "div", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(26, "div")(27, "label", 13);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(28, "svg", 14);
        \u0275\u0275element(29, "path", 21);
        \u0275\u0275elementEnd();
        \u0275\u0275text(30, " Credenciales ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(31, "div", 16);
        \u0275\u0275element(32, "input", 22);
        \u0275\u0275elementStart(33, "div", 18);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(34, "svg", 19);
        \u0275\u0275element(35, "path", 21);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(36, "button", 23);
        \u0275\u0275listener("click", function AdminLoginComponent_Template_button_click_36_listener() {
          return ctx.togglePasswordVisibility();
        });
        \u0275\u0275template(37, AdminLoginComponent__svg_svg_37_Template, 3, 0, "svg", 24)(38, AdminLoginComponent__svg_svg_38_Template, 2, 0, "svg", 24);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(39, AdminLoginComponent_div_39_Template, 2, 1, "div", 20);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(40, "div", 25)(41, "label", 26);
        \u0275\u0275element(42, "input", 27);
        \u0275\u0275elementStart(43, "span", 28);
        \u0275\u0275text(44, "Recu\xE9rdame");
        \u0275\u0275elementEnd()()();
        \u0275\u0275elementStart(45, "button", 29);
        \u0275\u0275template(46, AdminLoginComponent_span_46_Template, 4, 0, "span", 30)(47, AdminLoginComponent_span_47_Template, 3, 0, "span", 30);
        \u0275\u0275elementEnd()()()()();
      }
      if (rf & 2) {
        let tmp_5_0;
        let tmp_6_0;
        let tmp_10_0;
        let tmp_11_0;
        \u0275\u0275advance(11);
        \u0275\u0275property("ngIf", ctx.loginSuccess);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.mustChangePassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.loginError);
        \u0275\u0275advance();
        \u0275\u0275property("formGroup", ctx.loginForm);
        \u0275\u0275advance(7);
        \u0275\u0275classProp("border-red-400", ctx.isFieldInvalid("usuario"))("border-green-400", ((tmp_5_0 = ctx.loginForm.get("usuario")) == null ? null : tmp_5_0.valid) && ((tmp_5_0 = ctx.loginForm.get("usuario")) == null ? null : tmp_5_0.touched))("border-gray-300", !((tmp_6_0 = ctx.loginForm.get("usuario")) == null ? null : tmp_6_0.touched));
        \u0275\u0275attribute("disabled", ctx.isLoading ? true : null);
        \u0275\u0275advance(4);
        \u0275\u0275property("ngIf", ctx.getFieldError("usuario"));
        \u0275\u0275advance(7);
        \u0275\u0275classProp("border-red-400", ctx.isFieldInvalid("password"))("border-green-400", ((tmp_10_0 = ctx.loginForm.get("password")) == null ? null : tmp_10_0.valid) && ((tmp_10_0 = ctx.loginForm.get("password")) == null ? null : tmp_10_0.touched))("border-gray-300", !((tmp_11_0 = ctx.loginForm.get("password")) == null ? null : tmp_11_0.touched));
        \u0275\u0275property("type", ctx.showPassword ? "text" : "password");
        \u0275\u0275attribute("disabled", ctx.isLoading ? true : null);
        \u0275\u0275advance(4);
        \u0275\u0275property("disabled", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPassword);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.getFieldError("password"));
        \u0275\u0275advance(3);
        \u0275\u0275attribute("disabled", ctx.isLoading ? true : null);
        \u0275\u0275advance(3);
        \u0275\u0275property("disabled", !ctx.loginForm.valid || ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
      }
    }, dependencies: [CommonModule, NgIf, ReactiveFormsModule, \u0275NgNoValidate, DefaultValueAccessor, CheckboxControlValueAccessor, NgControlStatus, NgControlStatusGroup, FormGroupDirective, FormControlName], encapsulation: 2, changeDetection: 0 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AdminLoginComponent, { className: "AdminLoginComponent" });
})();

// src/app/manual/manual.component.ts
function ManualComponent__svg_svg_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 18);
    \u0275\u0275element(1, "path", 26);
    \u0275\u0275elementEnd();
  }
}
function ManualComponent__svg_svg_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 18);
    \u0275\u0275element(1, "path", 19);
    \u0275\u0275elementEnd();
  }
}
function ManualComponent_div_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275listener("click", function ManualComponent_div_14_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleIndex());
    });
    \u0275\u0275elementEnd();
  }
}
function ManualComponent_button_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function ManualComponent_button_30_Template_button_click_0_listener() {
      const section_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      ctx_r1.scrollToSection(section_r4.id);
      return \u0275\u0275resetView(ctx_r1.toggleIndex());
    });
    \u0275\u0275elementStart(1, "span", 29);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 30);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const section_r4 = ctx.$implicit;
    const i_r5 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", i_r5 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r4.title);
  }
}
function ManualComponent_div_32_div_8_li_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 43)(1, "span", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "span", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const step_r6 = ctx.$implicit;
    const stepIndex_r7 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", stepIndex_r7 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", step_r6, \u0275\u0275sanitizeHtml);
  }
}
function ManualComponent_div_32_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 37)(1, "h4", 38);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 39);
    \u0275\u0275element(3, "path", 40);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Procedimiento Detallado ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "ol", 41);
    \u0275\u0275template(6, ManualComponent_div_32_div_8_li_6_Template, 4, 2, "li", 42);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const section_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", section_r8.steps);
  }
}
function ManualComponent_div_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 31)(1, "div", 32)(2, "span", 33);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h2", 34);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 35);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, ManualComponent_div_32_div_8_Template, 7, 1, "div", 36);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const section_r8 = ctx.$implicit;
    const i_r9 = ctx.index;
    \u0275\u0275property("id", section_r8.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", i_r9 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r8.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(section_r8.content);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", section_r8.steps);
  }
}
var ManualComponent = class _ManualComponent {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
    this.showIndex = false;
    this.manualSections = [
      {
        id: "introduccion",
        title: "Informaci\xF3n General del Sistema",
        content: "Este sistema es una plataforma digital de gesti\xF3n de tr\xE1mites que permite a estudiantes y usuarios realizar solicitudes acad\xE9mico-administrativas de manera eficiente. Ofrece funcionalidades de seguimiento en tiempo real, gesti\xF3n de documentos digitales y notificaciones autom\xE1ticas. Proporciona una alternativa moderna a los procesos presenciales, reduciendo tiempos de espera y mejorando la trazabilidad de los tr\xE1mites."
      },
      {
        id: "registro",
        title: "Acceso al Sistema",
        content: "El acceso al sistema requiere credenciales de usuario proporcionadas por la instituci\xF3n. Para obtener sus credenciales, debe dirigirse a la Mesa de Partes con su identificaci\xF3n oficial.",
        steps: [
          "Ingrese a la p\xE1gina principal del sistema",
          'Haga clic en el enlace "Iniciar Sesi\xF3n" ubicado en la barra superior',
          "Ingrese su nombre de usuario en el campo de usuario",
          "Ingrese su contrase\xF1a en el campo de contrase\xF1a",
          'Haga clic en el bot\xF3n "Ingresar"',
          "En el primer acceso, se le solicitar\xE1 cambiar su contrase\xF1a por seguridad"
        ]
      },
      {
        id: "nuevo-tramite",
        title: "Crear un Nuevo Tr\xE1mite",
        content: "La creaci\xF3n de un tr\xE1mite requiere completar un formulario con informaci\xF3n espec\xEDfica y, en algunos casos, adjuntar documentos de soporte. El sistema valida la informaci\xF3n ingresada antes de permitir el env\xEDo.",
        steps: [
          "Acceda al men\xFA principal del sistema",
          'Seleccione la opci\xF3n "Nuevo Tr\xE1mite" o el bot\xF3n "+',
          "Seleccione el tipo de tr\xE1mite que desea realizar de la lista desplegable disponible",
          'Complete el campo de asunto con una descripci\xF3n concisa (ej: "Solicitud de Certificado de Estudios")',
          "En el campo de descripci\xF3n, proporcione detalles espec\xEDficos de su solicitud",
          'Adjunte los documentos requeridos haciendo clic en "Adjuntar Archivos" y seleccionando los archivos de su dispositivo',
          "Revise que toda la informaci\xF3n sea correcta",
          'Haga clic en el bot\xF3n "Enviar"',
          "Anote el c\xF3digo de referencia del tr\xE1mite (formato: TRM-XXXX-XXXX) para consultas posteriores"
        ]
      },
      {
        id: "seguimiento",
        title: "Consultar Estado de Tr\xE1mites",
        content: "El sistema proporciona dos opciones para consultar el estado de tr\xE1mites: una para usuarios registrados dentro del sistema y otra para consultas p\xFAblicas. Los usuarios p\xFAblicos pueden acceder mediante c\xF3digo QR generado por el sistema o directamente a trav\xE9s de b\xFAsqueda por n\xFAmero de documento.",
        steps: [
          '<strong>Para usuarios autenticados:</strong> Acceda a la secci\xF3n "Mis Tr\xE1mites" para visualizar todos sus tr\xE1mites con su estado actual actualizado',
          "<strong>Para consultas p\xFAblicas mediante c\xF3digo QR:</strong> Escanee el c\xF3digo QR proporcionado (generado por el sistema). Este lo redireccionar\xE1 autom\xE1ticamente a la p\xE1gina de verificaci\xF3n donde podr\xE1 consultar sus documentos asignados",
          '<strong>Para b\xFAsqueda p\xFAblica directa:</strong> Acceda a la opci\xF3n "Verificar/Buscar" en la plataforma, ingrese su n\xFAmero de documento de identidad y visualice todos los tr\xE1mites y documentos asignados a dicha identidad',
          "Los posibles estados del tr\xE1mite son:<br>- <strong>Enviado:</strong> El tr\xE1mite ha sido recibido y registrado en el sistema<br>- <strong>En Revisi\xF3n:</strong> El tr\xE1mite se encuentra en revisi\xF3n por el personal competente<br>- <strong>En Proceso:</strong> Se est\xE1 realizando el procesamiento de la solicitud<br>- <strong>Finalizado:</strong> El tr\xE1mite ha sido completado y los resultados est\xE1n disponibles<br>- <strong>Observado:</strong> El tr\xE1mite requiere informaci\xF3n o documentaci\xF3n adicional",
          "El sistema muestra una barra de progreso indicando el porcentaje de avance del tr\xE1mite"
        ]
      },
      {
        id: "documentos",
        title: "Gesti\xF3n de Documentos",
        content: "Los documentos adjuntos en los tr\xE1mites pueden ser visualizados y descargados en cualquier momento. El sistema proporciona acceso a documentos tanto adjuntados por el usuario como generados durante el procesamiento del tr\xE1mite.",
        steps: [
          'Acceda a la secci\xF3n "Mis Tr\xE1mites"',
          "Seleccione el tr\xE1mite espec\xEDfico del cual desea ver documentos",
          'Localize la secci\xF3n "Documentos Adjuntos"',
          "Se mostrar\xE1 una lista completa de todos los archivos asociados al tr\xE1mite",
          "Haga clic en el nombre del documento para visualizarlo en l\xEDnea",
          'Para descargar el documento, haga clic en el bot\xF3n "Descargar"',
          'El archivo se guardar\xE1 autom\xE1ticamente en la carpeta "Descargas" de su dispositivo'
        ]
      },
      {
        id: "notificaciones",
        title: "Sistema de Notificaciones",
        content: "El sistema genera notificaciones autom\xE1ticas cuando ocurren cambios en el estado de los tr\xE1mites. Las notificaciones proporcionan informaci\xF3n sobre el progreso y acciones requeridas.",
        steps: [
          "Localice el \xEDcono de campana de notificaciones en la esquina superior derecha de la interfaz",
          "Si hay nuevas notificaciones, se mostrar\xE1 un indicador num\xE9rico rojo",
          "Haga clic en la campana para desplegar la lista completa de notificaciones",
          "Las notificaciones incluyen informaci\xF3n sobre:<br>- Cambios de estado del tr\xE1mite<br>- Recepci\xF3n de documentaci\xF3n<br>- Disponibilidad de resultados<br>- Requerimientos de informaci\xF3n adicional",
          "Haga clic en cualquier notificaci\xF3n para navegar directamente al tr\xE1mite relacionado"
        ]
      },
      {
        id: "tips",
        title: "Recomendaciones para Uso \xD3ptimo",
        content: "Seguir estas recomendaciones mejora la eficiencia en el procesamiento de tr\xE1mites y reduce la necesidad de correcciones o consultas adicionales.",
        steps: [
          "<strong>Claridad de Informaci\xF3n:</strong> Proporcione descripciones claras y precisas en todos los campos de texto",
          "<strong>Documentaci\xF3n Completa:</strong> Adjunte todos los documentos requeridos en el primer env\xEDo para evitar retrasos",
          "<strong>Calidad de Documentos:</strong> Escanee o fotograf\xEDe documentos con buena iluminaci\xF3n y definici\xF3n",
          "<strong>Conserve C\xF3digo de Referencia:</strong> Guarde el c\xF3digo de tr\xE1mite en un lugar seguro para futuras consultas",
          "<strong>Monitoreo Regular:</strong> Consulte el sistema cada 2-3 d\xEDas para revisar actualizaciones",
          "<strong>Evite Duplicaciones:</strong> No env\xEDe m\xFAltiples copias del mismo tr\xE1mite",
          "<strong>Tiempos de Procesamiento:</strong> Los tr\xE1mites requieren entre 1 a 3 d\xEDas h\xE1biles para procesamiento, dependiendo del tipo"
        ]
      },
      {
        id: "problemas",
        title: "Preguntas Frecuentes",
        content: "Esta secci\xF3n aborda las consultas m\xE1s comunes sobre el uso del sistema y los procedimientos institucionales.",
        steps: [
          "<strong>\xBFCu\xE1l es el tiempo promedio de procesamiento?</strong><br>El tiempo var\xEDa entre 1 a 3 d\xEDas h\xE1biles dependiendo del tipo de tr\xE1mite y volumen de solicitudes",
          '<strong>\xBFPuedo editar un tr\xE1mite despu\xE9s de enviarlo?</strong><br>S\xED, es posible editar tr\xE1mites que se encuentren en estado "Enviado" u "Observado". Una vez en otros estados, no se permite edici\xF3n',
          '<strong>\xBFQu\xE9 significa el estado "Observado"?</strong><br>Indica que el tr\xE1mite requiere correcciones o documentaci\xF3n adicional. Revise las observaciones detalladas y realice los cambios necesarios',
          "<strong>\xBFD\xF3nde recojo los documentos finales?</strong><br>Algunos documentos est\xE1n disponibles para descarga directa en el sistema. Otros deben ser retirados personalmente en Mesa de Partes. Se especificar\xE1 en la respuesta del tr\xE1mite",
          "<strong>\xBFEs posible crear tr\xE1mites sin cuenta de usuario?</strong><br>S\xED, existe una opci\xF3n de creaci\xF3n p\xFAblica de tr\xE1mites para usuarios sin cuenta de usuario. La creaci\xF3n autenticada para usuarios registrados tambi\xE9n est\xE1 disponible. Ambas opciones cuentan con validaciones de seguridad. Es posible consultar el estado de tr\xE1mites sin cuenta utilizando el c\xF3digo de referencia",
          "<strong>Horario de Atenci\xF3n - Secretar\xEDa General:</strong><br>Lunes a Viernes, 07:30 a 15:00 horas<br>Ubicaci\xF3n: Av. Universitaria s/n, Pampa Grande, Tumbes"
        ]
      }
    ];
  }
  toggleIndex() {
    this.showIndex = !this.showIndex;
  }
  scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
  goBack() {
    const user = this.authService.currentUserValue;
    if (!user || !user.role) {
      this.router.navigate(["/"]);
      return;
    }
    const roleName = user.role.name.toUpperCase();
    switch (roleName) {
      case "USUARIO":
        this.router.navigate(["/usuario/mis-tramites"]);
        break;
      case "ADMINISTRATIVO":
        this.router.navigate(["/administrativo/dashboard"]);
        break;
      case "ADMIN":
        this.router.navigate(["/admin/dashboard"]);
        break;
      case "ESTUDIANTE":
        this.router.navigate(["/estudiante/tablero"]);
        break;
      default:
        this.router.navigate(["/"]);
    }
  }
  static {
    this.\u0275fac = function ManualComponent_Factory(t) {
      return new (t || _ManualComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ManualComponent, selectors: [["app-manual"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 33, vars: 11, consts: [[1, "min-h-screen", "bg-gray-50"], [1, "max-w-6xl", "mx-auto", "px-4", "py-8"], [1, "bg-white", "rounded-xl", "shadow-lg", "overflow-hidden"], [1, "bg-university-gradient", "text-white", "p-8", "text-center"], [1, "text-3xl", "font-bold", "mb-3"], [1, "text-base", "leading-relaxed"], [1, "p-8"], [1, "md:hidden", "fixed", "bottom-6", "right-6", "z-50", "w-14", "h-14", "bg-university-600", "hover:bg-university-700", "text-white", "rounded-full", "shadow-2xl", "flex", "items-center", "justify-center", "transition-all", "duration-300", "hover:scale-110", 3, "click"], ["class", "w-6 h-6", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], [1, "grid", "md:grid-cols-4", "gap-4"], [1, "md:col-span-1"], ["class", "md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 animate-fade-in", 3, "click", 4, "ngIf"], [1, "fixed", "md:relative", "md:translate-x-0", "top-0", "left-0", "h-full", "md:h-auto", "w-72", "md:w-auto", "bg-white", "md:bg-transparent", "z-50", "md:z-auto", "transition-transform", "duration-300", "shadow-2xl", "md:shadow-none", "overflow-y-auto", "md:overflow-visible", "p-6", "md:p-0"], [1, "md:hidden", "flex", "justify-between", "items-center", "mb-6", "pb-4", "border-b", "border-gray-200"], [1, "font-bold", "text-university-700", "text-lg", "flex", "items-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 10h16M4 14h16M4 18h16"], [1, "text-gray-500", "hover:text-gray-700", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], [1, "sticky", "top-20"], [1, "hidden", "md:flex", "font-bold", "text-university-700", "mb-4", "items-center", "text-lg"], [1, "space-y-2"], ["class", "w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-university-600 hover:bg-university-50 rounded-lg transition-colors flex items-center", 3, "click", 4, "ngFor", "ngForOf"], [1, "md:col-span-3", "space-y-6"], ["class", "bg-white rounded-lg p-6 border-l-4 border-university-600 scroll-mt-20 shadow-sm hover:shadow-md transition-shadow", 3, "id", 4, "ngFor", "ngForOf"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 6h16M4 12h16M4 18h16"], [1, "md:hidden", "fixed", "inset-0", "bg-black", "bg-opacity-50", "z-40", "animate-fade-in", 3, "click"], [1, "w-full", "text-left", "px-3", "py-2", "text-sm", "text-gray-600", "hover:text-university-600", "hover:bg-university-50", "rounded-lg", "transition-colors", "flex", "items-center", 3, "click"], [1, "w-6", "h-6", "bg-university-100", "text-university-700", "rounded-full", "flex", "items-center", "justify-center", "text-xs", "font-bold", "mr-3", "flex-shrink-0"], [1, "line-clamp-2"], [1, "bg-white", "rounded-lg", "p-6", "border-l-4", "border-university-600", "scroll-mt-20", "shadow-sm", "hover:shadow-md", "transition-shadow", 3, "id"], [1, "flex", "items-start", "mb-5"], [1, "w-8", "h-8", "bg-university-gradient", "text-white", "rounded-full", "flex", "items-center", "justify-center", "text-xs", "font-bold", "mr-4", "flex-shrink-0", "mt-0.5"], [1, "text-xl", "font-bold", "text-university-800", "leading-tight"], [1, "text-gray-700", "mb-6", "leading-relaxed", "text-justify"], ["class", "bg-gray-50 rounded-lg p-5 border border-gray-200", 4, "ngIf"], [1, "bg-gray-50", "rounded-lg", "p-5", "border", "border-gray-200"], [1, "font-semibold", "text-university-700", "mb-5", "flex", "items-center", "text-base"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "space-y-4"], ["class", "flex gap-4 items-start", 4, "ngFor", "ngForOf"], [1, "flex", "gap-4", "items-start"], [1, "w-7", "h-7", "bg-university-600", "text-white", "rounded-full", "flex", "items-center", "justify-center", "text-xs", "font-bold", "flex-shrink-0", "mt-0.5"], [1, "text-gray-700", "leading-relaxed", "text-sm", 3, "innerHTML"]], template: function ManualComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4);
        \u0275\u0275text(5, "Manual de Usuario del Sistema");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(6, "p", 5);
        \u0275\u0275text(7, "Documento de referencia que contiene instrucciones detalladas sobre el funcionamiento, operaci\xF3n y caracter\xEDsticas principales del Sistema de Gesti\xF3n de Tr\xE1mites de la Universidad Nacional de Tumbes. Consulte las secciones que correspondan a su necesidad espec\xEDfica.");
        \u0275\u0275elementEnd()();
        \u0275\u0275elementStart(8, "div", 6)(9, "button", 7);
        \u0275\u0275listener("click", function ManualComponent_Template_button_click_9_listener() {
          return ctx.toggleIndex();
        });
        \u0275\u0275template(10, ManualComponent__svg_svg_10_Template, 2, 0, "svg", 8)(11, ManualComponent__svg_svg_11_Template, 2, 0, "svg", 8);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(12, "div", 9)(13, "div", 10);
        \u0275\u0275template(14, ManualComponent_div_14_Template, 1, 0, "div", 11);
        \u0275\u0275elementStart(15, "div", 12)(16, "div", 13)(17, "h3", 14);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(18, "svg", 15);
        \u0275\u0275element(19, "path", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275text(20, " \xCDndice ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(21, "button", 17);
        \u0275\u0275listener("click", function ManualComponent_Template_button_click_21_listener() {
          return ctx.toggleIndex();
        });
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(22, "svg", 18);
        \u0275\u0275element(23, "path", 19);
        \u0275\u0275elementEnd()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(24, "div", 20)(25, "h3", 21);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(26, "svg", 15);
        \u0275\u0275element(27, "path", 16);
        \u0275\u0275elementEnd();
        \u0275\u0275text(28, " Secciones del Manual ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(29, "nav", 22);
        \u0275\u0275template(30, ManualComponent_button_30_Template, 5, 2, "button", 23);
        \u0275\u0275elementEnd()()()();
        \u0275\u0275elementStart(31, "div", 24);
        \u0275\u0275template(32, ManualComponent_div_32_Template, 9, 5, "div", 25);
        \u0275\u0275elementEnd()()()()()();
      }
      if (rf & 2) {
        \u0275\u0275advance(9);
        \u0275\u0275classProp("bg-university-700", ctx.showIndex);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", !ctx.showIndex);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showIndex);
        \u0275\u0275advance(3);
        \u0275\u0275property("ngIf", ctx.showIndex);
        \u0275\u0275advance();
        \u0275\u0275classProp("translate-x-0", ctx.showIndex)("-translate-x-full", !ctx.showIndex);
        \u0275\u0275advance(15);
        \u0275\u0275property("ngForOf", ctx.manualSections);
        \u0275\u0275advance(2);
        \u0275\u0275property("ngForOf", ctx.manualSections);
      }
    }, dependencies: [CommonModule, NgForOf, NgIf], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ManualComponent, { className: "ManualComponent" });
})();

// src/app/search/search.component.ts
var _c0 = (a0, a1) => ({ "bg-gradient-to-br from-university-50 to-university-100": a0, "bg-gradient-to-br from-dark-800 to-dark-700": a1 });
var _c1 = (a0, a1) => ({ "bg-white": a0, "bg-dark-800": a1 });
var _c2 = (a0, a1) => ({ "text-university-800": a0, "text-university-200": a1 });
var _c3 = (a0, a1) => ({ "text-gray-600": a0, "text-dark-400": a1 });
var _c4 = (a0, a1) => ({ "text-gray-700": a0, "text-dark-300": a1 });
var _c5 = (a0, a1) => ({ "text-gray-500": a0, "text-dark-400": a1 });
var _c6 = (a0, a1) => ({ "input-light": a0, "input-dark": a1 });
var _c7 = (a0, a1) => ({ "bg-red-50 border-red-200": a0, "bg-red-900/20 border-red-800": a1 });
var _c8 = (a0, a1) => ({ "text-red-700": a0, "text-red-200": a1 });
var _c9 = (a0, a1) => ({ "border-gray-200 bg-white": a0, "border-dark-600 bg-dark-800": a1 });
var _c10 = (a0, a1) => ({ "hover:bg-university-50 border-gray-100": a0, "hover:bg-dark-700 border-dark-600": a1 });
var _c11 = (a0, a1) => ({ "text-university-700": a0, "text-university-300": a1 });
var _c12 = (a0, a1) => ({ "text-gray-500": a0, "text-dark-500": a1 });
var _c13 = (a0, a1) => ({ "border-university-200 bg-university-50": a0, "border-dark-600 bg-dark-700": a1 });
var _c14 = (a0, a1, a2) => ({ "bg-green-50 border-l-4 border-green-500": a0, "bg-red-50 border-l-4 border-red-500": a1, "bg-yellow-50 border-l-4 border-yellow-500": a2 });
var _c15 = (a0, a1, a2) => ({ "text-green-800": a0, "text-red-800": a1, "text-yellow-800": a2 });
function SearchComponent_div_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "div", 26);
    \u0275\u0275listener("click", function SearchComponent_div_2_Template_div_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToCreate());
    });
    \u0275\u0275elementStart(3, "div", 27)(4, "div", 28);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 29);
    \u0275\u0275element(6, "path", 30);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div")(8, "h3", 31);
    \u0275\u0275text(9, " Crear Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 32);
    \u0275\u0275text(11, " Inicia un nuevo tr\xE1mite completando el formulario con tus datos personales ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 33)(13, "span", 34);
    \u0275\u0275text(14, "Iniciar");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 35);
    \u0275\u0275element(16, "path", 36);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(17, "div", 26);
    \u0275\u0275listener("click", function SearchComponent_div_2_Template_div_click_17_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.navigateToSearch());
    });
    \u0275\u0275elementStart(18, "div", 27)(19, "div", 37);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(20, "svg", 29);
    \u0275\u0275element(21, "path", 38);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(22, "div")(23, "h3", 31);
    \u0275\u0275text(24, " Buscar Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 32);
    \u0275\u0275text(26, " Consulta el estado de tu tr\xE1mite usando tu n\xFAmero de documento de identidad ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 39)(28, "span", 34);
    \u0275\u0275text(29, "Buscar");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(30, "svg", 35);
    \u0275\u0275element(31, "path", 36);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c1, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(9, _c2, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(12, _c3, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(7);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(15, _c1, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(18, _c2, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(21, _c3, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
  }
}
function SearchComponent_div_3_div_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275element(1, "div", 61);
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_3_div_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 62);
    \u0275\u0275element(2, "path", 63);
    \u0275\u0275elementEnd()();
  }
}
function SearchComponent_div_3_div_18_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 48);
    \u0275\u0275element(2, "path", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " B\xFAsqueda por DNI ");
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_3_div_18_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 48);
    \u0275\u0275element(2, "path", 73);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " B\xFAsqueda por C\xF3digo ");
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_3_div_18_span_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 48);
    \u0275\u0275element(2, "path", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " B\xFAsqueda por Texto ");
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_3_div_18_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 76);
    \u0275\u0275element(2, "circle", 77)(3, "path", 78);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Buscando... ");
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_3_div_18_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u2713 ", ctx_r1.possibleMatches.length, " coincidencia(s) encontrada(s) ");
  }
}
function SearchComponent_div_3_div_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64);
    \u0275\u0275template(1, SearchComponent_div_3_div_18_span_1_Template, 4, 0, "span", 65)(2, SearchComponent_div_3_div_18_span_2_Template, 4, 0, "span", 66)(3, SearchComponent_div_3_div_18_span_3_Template, 4, 0, "span", 67);
    \u0275\u0275elementStart(4, "p", 32);
    \u0275\u0275template(5, SearchComponent_div_3_div_18_span_5_Template, 5, 0, "span", 68)(6, SearchComponent_div_3_div_18_span_6_Template, 2, 1, "span", 69);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchType === "dni");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchType === "codigo");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchType === "texto");
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c3, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isSearching && ctx_r1.possibleMatches.length > 0);
  }
}
function SearchComponent_div_3_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80)(1, "div", 81);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 82);
    \u0275\u0275element(3, "path", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 32);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(3, _c7, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(6, _c8, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.errorMessage || "No se encontr\xF3 el expediente " + ctx_r1.searchQuery + ". Verifica el n\xFAmero e intenta nuevamente.", " ");
  }
}
function SearchComponent_div_3_div_20_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275listener("click", function SearchComponent_div_3_div_20_div_1_Template_div_click_0_listener() {
      const match_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.selectResult(match_r5));
    });
    \u0275\u0275elementStart(1, "div", 87)(2, "div")(3, "p", 88);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 32);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 89);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const match_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(7, _c10, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(10, _c11, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r5.titulo);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(13, _c3, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r5.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(16, _c12, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(match_r5.expediente);
  }
}
function SearchComponent_div_3_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 84);
    \u0275\u0275template(1, SearchComponent_div_3_div_20_div_1_Template, 9, 19, "div", 85);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(2, _c9, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.possibleMatches);
  }
}
function SearchComponent_div_3_div_26_ng_container_35_div_1_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "p", 98);
    \u0275\u0275text(2, "Fecha de Respuesta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 99);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tramite_r7 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(5, 1, tramite_r7.fechaRespuesta, "dd/MM/yyyy HH:mm"));
  }
}
function SearchComponent_div_3_div_26_ng_container_35_div_1_div_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "p", 98);
    \u0275\u0275text(2, "Respondido por");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 99);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 116);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tramite_r7 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", tramite_r7.usuarioRespondio.nombre, " ", tramite_r7.usuarioRespondio.apellidos, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(tramite_r7.usuarioRespondio.correo);
  }
}
function SearchComponent_div_3_div_26_ng_container_35_div_1_div_14_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 122)(1, "div", 123);
    \u0275\u0275element(2, "i", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 125)(4, "p", 126);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 127);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 128);
    \u0275\u0275listener("click", function SearchComponent_div_3_div_26_ng_container_35_div_1_div_14_div_6_Template_button_click_8_listener() {
      const archivo_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(6);
      return \u0275\u0275resetView(ctx_r1.viewResponseDocument(archivo_r9));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 41);
    \u0275\u0275element(10, "path", 129)(11, "path", 130);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const archivo_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(6);
    \u0275\u0275advance(2);
    \u0275\u0275classMap(ctx_r1.getFileIcon(archivo_r9.tipo));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(archivo_r9.nombre);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatFileSize(archivo_r9.tamanio));
  }
}
function SearchComponent_div_3_div_26_ng_container_35_div_1_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 117)(1, "p", 118);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "path", 119);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 120);
    \u0275\u0275template(6, SearchComponent_div_3_div_26_ng_container_35_div_1_div_14_div_6_Template, 12, 4, "div", 121);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const tramite_r7 = \u0275\u0275nextContext(2).ngIf;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Archivos Adjuntos de Respuesta (", tramite_r7.archivosRespuesta.length, ") ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", tramite_r7.archivosRespuesta);
  }
}
function SearchComponent_div_3_div_26_ng_container_35_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 110)(1, "h3", 111);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 112);
    \u0275\u0275element(3, "path", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Respuesta del Tr\xE1mite ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "div", 96)(6, "div", 97);
    \u0275\u0275template(7, SearchComponent_div_3_div_26_ng_container_35_div_1_div_7_Template, 6, 4, "div", 100)(8, SearchComponent_div_3_div_26_ng_container_35_div_1_div_8_Template, 7, 3, "div", 100);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "div")(10, "p", 98);
    \u0275\u0275text(11, "Respuesta");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "p", 114);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(14, SearchComponent_div_3_div_26_ng_container_35_div_1_div_14_Template, 7, 2, "div", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tramite_r7 = \u0275\u0275nextContext().ngIf;
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", tramite_r7.fechaRespuesta);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r7.usuarioRespondio);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(tramite_r7.respuesta);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r7.archivosRespuesta && tramite_r7.archivosRespuesta.length > 0);
  }
}
function SearchComponent_div_3_div_26_ng_container_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, SearchComponent_div_3_div_26_ng_container_35_div_1_Template, 15, 4, "div", 109);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const tramite_r7 = ctx.ngIf;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", tramite_r7.respuesta);
  }
}
function SearchComponent_div_3_div_26__svg_svg_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 41);
    \u0275\u0275element(1, "path", 129)(2, "path", 130);
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_3_div_26_div_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 131);
  }
}
function SearchComponent_div_3_div_26_div_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 132)(1, "div", 133);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 134);
    \u0275\u0275element(3, "path", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "div")(5, "p", 135);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 136);
    \u0275\u0275text(8, "Si el problema persiste, contacta con Mesa de Partes.");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function SearchComponent_div_3_div_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 90)(1, "div", 91)(2, "div", 92)(3, "div")(4, "h2", 93);
    \u0275\u0275text(5, "Detalle del Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 94);
    \u0275\u0275text(7, "Expediente: ");
    \u0275\u0275elementStart(8, "span", 43);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "span", 95);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 96)(13, "div", 97)(14, "div")(15, "p", 98);
    \u0275\u0275text(16, "Fecha de Registro");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "p", 99);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div")(20, "p", 98);
    \u0275\u0275text(21, "Tipo de Tr\xE1mite");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "p", 99);
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "div", 97)(25, "div")(26, "p", 98);
    \u0275\u0275text(27, "\xC1rea Responsable");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "p", 99);
    \u0275\u0275text(29);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "div")(31, "p", 98);
    \u0275\u0275text(32, "Descripci\xF3n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 99);
    \u0275\u0275text(34);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275template(35, SearchComponent_div_3_div_26_ng_container_35_Template, 2, 1, "ng-container", 100);
    \u0275\u0275elementStart(36, "div", 101)(37, "button", 102);
    \u0275\u0275listener("click", function SearchComponent_div_3_div_26_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.clearSearch());
    });
    \u0275\u0275elementStart(38, "span", 103);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(39, "svg", 41);
    \u0275\u0275element(40, "path", 104);
    \u0275\u0275elementEnd();
    \u0275\u0275text(41, " Nueva B\xFAsqueda ");
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(42, "button", 105);
    \u0275\u0275listener("click", function SearchComponent_div_3_div_26_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDocument());
    });
    \u0275\u0275elementStart(43, "span", 103);
    \u0275\u0275template(44, SearchComponent_div_3_div_26__svg_svg_44_Template, 3, 0, "svg", 106)(45, SearchComponent_div_3_div_26_div_45_Template, 1, 0, "div", 107);
    \u0275\u0275text(46);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(47, SearchComponent_div_3_div_26_div_47_Template, 9, 1, "div", 108);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.selectedResult.expediente);
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r1.getStatusClass(ctx_r1.selectedResult.estado));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedResult.estado, " ");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r1.selectedResult.fecha);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedResult.tipo);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedResult.area);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedResult.descripcion);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedTramite);
    \u0275\u0275advance(7);
    \u0275\u0275property("disabled", ctx_r1.loadingDocuments);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.loadingDocuments);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loadingDocuments);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.loadingDocuments ? "Cargando..." : "Ver Documentos", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage && ctx_r1.showError);
  }
}
function SearchComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "button", 40);
    \u0275\u0275listener("click", function SearchComponent_div_3_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToLanding());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5, "Volver");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 44)(7, "div", 45)(8, "label", 46);
    \u0275\u0275text(9, " Buscar Tr\xE1mite por N\xFAmero de Documento ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 47);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 48);
    \u0275\u0275element(12, "path", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Solo buscar por: DNI (8 d\xEDgitos), Carnet de Extranjer\xEDa (9-12 caracteres) o Pasaporte (6-12 caracteres) ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "div", 50)(15, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_3_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.searchQuery, $event) || (ctx_r1.searchQuery = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function SearchComponent_div_3_Template_input_ngModelChange_15_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSearchChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, SearchComponent_div_3_div_16_Template, 2, 0, "div", 52)(17, SearchComponent_div_3_div_17_Template, 3, 0, "div", 52);
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, SearchComponent_div_3_div_18_Template, 7, 9, "div", 53)(19, SearchComponent_div_3_div_19_Template, 6, 9, "div", 54)(20, SearchComponent_div_3_div_20_Template, 2, 5, "div", 55);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 56);
    \u0275\u0275listener("click", function SearchComponent_div_3_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.search());
    });
    \u0275\u0275elementStart(22, "span", 57);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(23, "svg", 58);
    \u0275\u0275element(24, "path", 38);
    \u0275\u0275elementEnd();
    \u0275\u0275text(25, " Consultar tr\xE1mite ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(26, SearchComponent_div_3_div_26_Template, 48, 14, "div", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(16, _c1, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(19, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(22, _c5, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(5);
    \u0275\u0275classProp("border-red-400", ctx_r1.showError)("border-green-500", ctx_r1.showSuccess);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.searchQuery);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(25, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showSuccess && !ctx_r1.isSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.searchQuery && ctx_r1.searchQuery.length >= 3);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.showError && !ctx_r1.isSearching);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.possibleMatches.length > 0 && !ctx_r1.selectedResult);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.searchQuery || ctx_r1.searchQuery.length < 5 || ctx_r1.isSearching);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.selectedResult);
  }
}
function SearchComponent_div_4_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 167)(1, "div", 168);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 169);
    \u0275\u0275element(3, "path", 113);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 170);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.successMessage);
  }
}
function SearchComponent_div_4_option_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 171);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r11 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r11.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tipo_r11.label);
  }
}
function SearchComponent_div_4_option_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 171);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const tipo_r12 = ctx.$implicit;
    \u0275\u0275property("value", tipo_r12.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(tipo_r12.label);
  }
}
function SearchComponent_div_4_div_83_div_1_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 183);
    \u0275\u0275element(1, "img", 184);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const archivo_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", archivo_r15.preview, \u0275\u0275sanitizeUrl)("alt", archivo_r15.file.name);
  }
}
function SearchComponent_div_4_div_83_div_1_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 185);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 186);
    \u0275\u0275element(2, "path", 187);
    \u0275\u0275elementEnd()();
  }
}
function SearchComponent_div_4_div_83_div_1_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 188);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 189);
    \u0275\u0275element(2, "path", 190);
    \u0275\u0275elementEnd()();
  }
}
function SearchComponent_div_4_div_83_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 174)(1, "button", 175);
    \u0275\u0275listener("click", function SearchComponent_div_4_div_83_div_1_Template_button_click_1_listener() {
      const i_r14 = \u0275\u0275restoreView(_r13).index;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.removeFile(i_r14));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 176);
    \u0275\u0275element(3, "path", 177);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(4, SearchComponent_div_4_div_83_div_1_div_4_Template, 2, 2, "div", 178)(5, SearchComponent_div_4_div_83_div_1_div_5_Template, 3, 0, "div", 179)(6, SearchComponent_div_4_div_83_div_1_div_6_Template, 3, 0, "div", 180);
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(7, "div", 181)(8, "p", 182);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "p", 127);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const archivo_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", archivo_r15.type === "image");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", archivo_r15.type === "pdf");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", archivo_r15.type === "document");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(archivo_r15.file.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatFileSize(archivo_r15.file.size));
  }
}
function SearchComponent_div_4_div_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 172);
    \u0275\u0275template(1, SearchComponent_div_4_div_83_div_1_Template, 12, 5, "div", 173);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.archivosPreview);
  }
}
function SearchComponent_div_4_div_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 191);
    \u0275\u0275element(1, "img", 192);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("src", ctx_r1.captchaImage, \u0275\u0275sanitizeUrl);
  }
}
function SearchComponent_div_4_div_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193)(1, "div", 168);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 194);
    \u0275\u0275element(3, "path", 83);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "p", 195);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function SearchComponent_div_4__svg_svg_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 41);
    \u0275\u0275element(1, "path", 30);
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_4_div_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "div", 131);
  }
}
function SearchComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "button", 40);
    \u0275\u0275listener("click", function SearchComponent_div_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.backToLanding());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 41);
    \u0275\u0275element(3, "path", 42);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(4, "span", 43);
    \u0275\u0275text(5, "Volver");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(6, SearchComponent_div_4_div_6_Template, 6, 1, "div", 137);
    \u0275\u0275elementStart(7, "div", 138)(8, "form", 139);
    \u0275\u0275listener("ngSubmit", function SearchComponent_div_4_Template_form_ngSubmit_8_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.submitTramite());
    });
    \u0275\u0275elementStart(9, "div", 140)(10, "div")(11, "label", 46);
    \u0275\u0275text(12, " Tipo de Documento ");
    \u0275\u0275elementStart(13, "span", 141);
    \u0275\u0275text(14, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "select", 142);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.tipoDocumento, $event) || (ctx_r1.tramiteForm.tipoDocumento = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275template(16, SearchComponent_div_4_option_16_Template, 2, 2, "option", 143);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div")(18, "label", 46);
    \u0275\u0275text(19, " N\xFAmero de Documento ");
    \u0275\u0275elementStart(20, "span", 141);
    \u0275\u0275text(21, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "input", 144);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.numeroDocumento, $event) || (ctx_r1.tramiteForm.numeroDocumento = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function SearchComponent_div_4_Template_input_input_22_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNumericInput($event, "numeroDocumento"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "p", 145);
    \u0275\u0275text(24, " Solo n\xFAmeros, entre 8 y 12 d\xEDgitos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div")(26, "label", 46);
    \u0275\u0275text(27, " Nombres ");
    \u0275\u0275elementStart(28, "span", 141);
    \u0275\u0275text(29, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(30, "input", 146);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.nombres, $event) || (ctx_r1.tramiteForm.nombres = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div")(32, "label", 46);
    \u0275\u0275text(33, " Apellidos ");
    \u0275\u0275elementStart(34, "span", 141);
    \u0275\u0275text(35, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "input", 147);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_36_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.apellidos, $event) || (ctx_r1.tramiteForm.apellidos = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "div")(38, "label", 46);
    \u0275\u0275text(39, " Correo ");
    \u0275\u0275elementStart(40, "span", 141);
    \u0275\u0275text(41, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "input", 148);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.email, $event) || (ctx_r1.tramiteForm.email = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div")(44, "label", 46);
    \u0275\u0275text(45, " Celular ");
    \u0275\u0275elementStart(46, "span", 149);
    \u0275\u0275text(47, "(Opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "input", 150);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_48_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.telefono, $event) || (ctx_r1.tramiteForm.telefono = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function SearchComponent_div_4_Template_input_input_48_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onNumericInput($event, "telefono"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "p", 145);
    \u0275\u0275text(50, " Solo n\xFAmeros, 9 d\xEDgitos ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div")(52, "label", 46);
    \u0275\u0275text(53, " Tipo de Tr\xE1mite ");
    \u0275\u0275elementStart(54, "span", 141);
    \u0275\u0275text(55, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(56, "select", 151);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_select_ngModelChange_56_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.tipoTramite, $event) || (ctx_r1.tramiteForm.tipoTramite = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(57, "option", 152);
    \u0275\u0275text(58, "Seleccione un tipo");
    \u0275\u0275elementEnd();
    \u0275\u0275template(59, SearchComponent_div_4_option_59_Template, 2, 2, "option", 143);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(60, "div", 45)(61, "label", 46);
    \u0275\u0275text(62, " Asunto ");
    \u0275\u0275elementStart(63, "span", 141);
    \u0275\u0275text(64, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(65, "input", 153);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_65_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.asunto, $event) || (ctx_r1.tramiteForm.asunto = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "p", 145);
    \u0275\u0275text(67);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(68, "div", 45)(69, "label", 46);
    \u0275\u0275text(70, " Descripci\xF3n ");
    \u0275\u0275elementStart(71, "span", 149);
    \u0275\u0275text(72, "(Opcional)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(73, "textarea", 154);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_textarea_ngModelChange_73_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.descripcion, $event) || (ctx_r1.tramiteForm.descripcion = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "p", 145);
    \u0275\u0275text(75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(76, "div", 45)(77, "label", 46);
    \u0275\u0275text(78, " Archivos Adjuntos (Opcional) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "input", 155, 0);
    \u0275\u0275listener("change", function SearchComponent_div_4_Template_input_change_79_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilesSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "p", 145);
    \u0275\u0275text(82, " M\xE1ximo 3 archivos, 50MB cada uno. Formatos: PDF, JPG, PNG, DOC, DOCX ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(83, SearchComponent_div_4_div_83_Template, 2, 1, "div", 156);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(84, "div", 157)(85, "label", 158);
    \u0275\u0275text(86, " Verificaci\xF3n CAPTCHA ");
    \u0275\u0275elementStart(87, "span", 141);
    \u0275\u0275text(88, "*");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(89, "div", 159);
    \u0275\u0275template(90, SearchComponent_div_4_div_90_Template, 2, 1, "div", 160);
    \u0275\u0275elementStart(91, "button", 161);
    \u0275\u0275listener("click", function SearchComponent_div_4_Template_button_click_91_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.generateCaptcha());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(92, "svg", 41);
    \u0275\u0275element(93, "path", 104);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(94, "input", 162);
    \u0275\u0275twoWayListener("ngModelChange", function SearchComponent_div_4_Template_input_ngModelChange_94_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.tramiteForm.captchaCode, $event) || (ctx_r1.tramiteForm.captchaCode = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(95, SearchComponent_div_4_div_95_Template, 6, 1, "div", 163);
    \u0275\u0275elementStart(96, "div", 164)(97, "button", 165);
    \u0275\u0275listener("click", function SearchComponent_div_4_Template_button_click_97_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetCreateForm());
    });
    \u0275\u0275text(98, " Limpiar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(99, "button", 166)(100, "span", 103);
    \u0275\u0275template(101, SearchComponent_div_4__svg_svg_101_Template, 2, 0, "svg", 106)(102, SearchComponent_div_4_div_102_Template, 1, 0, "div", 107);
    \u0275\u0275text(103);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngIf", ctx_r1.successMessage);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(55, _c1, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(58, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.tipoDocumento);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(61, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.tiposDocumento);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(64, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.numeroDocumento);
    \u0275\u0275property("placeholder", ctx_r1.getTipoDocumentoConfig().placeholder)("maxlength", ctx_r1.getTipoDocumentoConfig().maxLength)("ngClass", \u0275\u0275pureFunction2(67, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(70, _c5, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(73, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.nombres);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(76, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(79, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.apellidos);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(82, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(85, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.email);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(88, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(91, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.telefono);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(94, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(97, _c5, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(100, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.tipoTramite);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(103, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r1.tiposTramite);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(106, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.asunto);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(109, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(112, _c5, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.tramiteForm.asunto.length, "/200 caracteres ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(115, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.descripcion);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(118, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(121, _c5, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (ctx_r1.tramiteForm.descripcion == null ? null : ctx_r1.tramiteForm.descripcion.length) || 0, "/2000 caracteres ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(124, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(127, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(130, _c5, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.archivosPreview.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(133, _c13, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(136, _c4, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.captchaImage);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r1.isLoadingCaptcha);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.tramiteForm.captchaCode);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(139, _c6, !ctx_r1.isDarkMode, ctx_r1.isDarkMode));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.errorMessage && ctx_r1.showError);
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r1.isSubmittingTramite || !ctx_r1.isFormComplete())("title", !ctx_r1.isFormComplete() ? "Complete todos los campos obligatorios" : "");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", !ctx_r1.isSubmittingTramite);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isSubmittingTramite);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.isSubmittingTramite ? "Creando..." : "Crear Tr\xE1mite", " ");
  }
}
function SearchComponent_div_27_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 208);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 209);
    \u0275\u0275element(2, "path", 200);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(3, "p", 210);
    \u0275\u0275text(4, "No hay documentos disponibles");
    \u0275\u0275elementEnd()();
  }
}
function SearchComponent_div_27_div_15_div_5_span_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 176);
    \u0275\u0275element(2, "path", 221);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatFileSize(doc_r18.tamanio), " ");
  }
}
function SearchComponent_div_27_div_15_div_5_span_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 176);
    \u0275\u0275element(2, "path", 222);
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const doc_r18 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatDate(doc_r18.fechaSubida), " ");
  }
}
function SearchComponent_div_27_div_15_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 214);
    \u0275\u0275listener("click", function SearchComponent_div_27_div_15_div_5_Template_div_click_0_listener() {
      const doc_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.viewSpecificDocument(doc_r18));
    });
    \u0275\u0275elementStart(1, "div", 215)(2, "div", 216);
    \u0275\u0275element(3, "i", 124);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 125)(5, "h4", 217);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 218)(8, "span", 75);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(9, "svg", 176);
    \u0275\u0275element(10, "path", 219);
    \u0275\u0275elementEnd();
    \u0275\u0275text(11);
    \u0275\u0275elementEnd();
    \u0275\u0275template(12, SearchComponent_div_27_div_15_div_5_span_12_Template, 4, 1, "span", 68)(13, SearchComponent_div_27_div_15_div_5_span_13_Template, 4, 1, "span", 68);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "div", 123);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(15, "svg", 220);
    \u0275\u0275element(16, "path", 36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const doc_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getFileIcon(doc_r18.tipo));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", doc_r18.nombre, " ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", doc_r18.tipo || "Tipo desconocido", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r18.tamanio);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", doc_r18.fechaSubida);
  }
}
function SearchComponent_div_27_div_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 211)(1, "p", 212)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " documento(s) encontrado(s). Haz clic en uno para visualizarlo. ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, SearchComponent_div_27_div_15_div_5_Template, 17, 6, "div", 213);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.documentos.length);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.documentos);
  }
}
function SearchComponent_div_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 196)(1, "div", 197)(2, "div", 198)(3, "div")(4, "h3", 199);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(5, "svg", 112);
    \u0275\u0275element(6, "path", 200);
    \u0275\u0275elementEnd();
    \u0275\u0275text(7, " Documentos Adjuntos ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "p", 201);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "button", 202);
    \u0275\u0275listener("click", function SearchComponent_div_27_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDocumentsModal());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 112);
    \u0275\u0275element(12, "path", 177);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(13, "div", 203);
    \u0275\u0275template(14, SearchComponent_div_27_div_14_Template, 5, 0, "div", 204)(15, SearchComponent_div_27_div_15_Template, 6, 2, "div", 205);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 206)(17, "button", 207);
    \u0275\u0275listener("click", function SearchComponent_div_27_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r16);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeDocumentsModal());
    });
    \u0275\u0275text(18, " Cerrar ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("Expediente: ", ctx_r1.selectedResult == null ? null : ctx_r1.selectedResult.expediente, "");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.documentos.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.documentos.length > 0);
  }
}
function SearchComponent_div_28_iframe_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "iframe", 234);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("src", ctx_r1.pdfUrl, \u0275\u0275sanitizeResourceUrl);
  }
}
function SearchComponent_div_28_div_10_span_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, " \u2022 ");
    \u0275\u0275elementStart(2, "strong");
    \u0275\u0275text(3, "Tama\xF1o:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatFileSize(ctx_r1.currentDocument.tamanio), "");
  }
}
function SearchComponent_div_28_div_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 235)(1, "div", 236)(2, "div", 45);
    \u0275\u0275element(3, "i", 237);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h4", 238);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 239);
    \u0275\u0275text(7, " Este tipo de archivo no se puede previsualizar en el navegador. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "p", 240);
    \u0275\u0275text(9, " Para ver el contenido completo, descarga el archivo haciendo clic en el bot\xF3n de abajo. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "a", 241);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(11, "svg", 41);
    \u0275\u0275element(12, "path", 242);
    \u0275\u0275elementEnd();
    \u0275\u0275text(13, " Descargar Archivo ");
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(14, "div", 243)(15, "p", 127)(16, "strong");
    \u0275\u0275text(17, "Tipo:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18);
    \u0275\u0275template(19, SearchComponent_div_28_div_10_span_19_Template, 5, 1, "span", 100);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(ctx_r1.getFileIcon(ctx_r1.currentDocument == null ? null : ctx_r1.currentDocument.tipo));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.currentDocument == null ? null : ctx_r1.currentDocument.nombre, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("href", ctx_r1.pdfUrl, \u0275\u0275sanitizeUrl)("download", ctx_r1.currentDocument == null ? null : ctx_r1.currentDocument.nombre);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" ", (ctx_r1.currentDocument == null ? null : ctx_r1.currentDocument.tipo) || "Desconocido", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.currentDocument == null ? null : ctx_r1.currentDocument.tamanio);
  }
}
function SearchComponent_div_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 196)(1, "div", 223)(2, "div", 224)(3, "h3", 225);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 226);
    \u0275\u0275listener("click", function SearchComponent_div_28_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePdfViewer());
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(6, "svg", 112);
    \u0275\u0275element(7, "path", 177);
    \u0275\u0275elementEnd()()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(8, "div", 227);
    \u0275\u0275template(9, SearchComponent_div_28_iframe_9_Template, 1, 1, "iframe", 228)(10, SearchComponent_div_28_div_10_Template, 20, 7, "div", 229);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 230)(12, "p", 116);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "div", 231)(15, "a", 232);
    \u0275\u0275text(16, " Descargar ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "button", 233);
    \u0275\u0275listener("click", function SearchComponent_div_28_Template_button_click_17_listener() {
      \u0275\u0275restoreView(_r19);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closePdfViewer());
    });
    \u0275\u0275text(18, " Cerrar ");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Documento: ", ctx_r1.selectedResult == null ? null : ctx_r1.selectedResult.expediente, " ");
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.canPreviewDocument);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.canPreviewDocument);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" ", ctx_r1.selectedResult == null ? null : ctx_r1.selectedResult.tipo, " - ", ctx_r1.selectedResult == null ? null : ctx_r1.selectedResult.fecha, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("href", ctx_r1.pdfUrl, \u0275\u0275sanitizeUrl);
  }
}
function SearchComponent_div_29__svg_svg_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 251);
    \u0275\u0275element(1, "path", 113);
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_29__svg_svg_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 252);
    \u0275\u0275element(1, "path", 253);
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_29__svg_svg_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(0, "svg", 254);
    \u0275\u0275element(1, "path", 255);
    \u0275\u0275elementEnd();
  }
}
function SearchComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 244)(1, "div", 245)(2, "div", 123);
    \u0275\u0275template(3, SearchComponent_div_29__svg_svg_3_Template, 2, 0, "svg", 246)(4, SearchComponent_div_29__svg_svg_4_Template, 2, 0, "svg", 247)(5, SearchComponent_div_29__svg_svg_5_Template, 2, 0, "svg", 248);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 12)(7, "p", 249);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "button", 250);
    \u0275\u0275listener("click", function SearchComponent_div_29_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.showToast = false);
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(10, "svg", 41);
    \u0275\u0275element(11, "path", 177);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("animate-slide-out-right", !ctx_r1.showToast);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(8, _c14, ctx_r1.toastType === "success", ctx_r1.toastType === "error", ctx_r1.toastType === "warning"));
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.toastType === "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.toastType === "error");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.toastType === "warning");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(12, _c15, ctx_r1.toastType === "success", ctx_r1.toastType === "error", ctx_r1.toastType === "warning"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.toastMessage, " ");
  }
}
var SearchComponent = class _SearchComponent {
  constructor(router, route, sanitizer, http, authService) {
    this.router = router;
    this.route = route;
    this.sanitizer = sanitizer;
    this.http = http;
    this.authService = authService;
    this.currentView = "landing";
    this.searchQuery = "";
    this.isSearching = false;
    this.showError = false;
    this.showSuccess = false;
    this.selectedResult = null;
    this.selectedTramite = null;
    this.possibleMatches = [];
    this.showPdfViewer = false;
    this.pdfUrl = null;
    this.isDarkMode = false;
    this.searchSubject = new Subject();
    this.apiUrl = environment.apiUrl;
    this.errorMessage = "";
    this.showDocumentsModal = false;
    this.documentos = [];
    this.currentDocument = null;
    this.loadingDocuments = false;
    this.canPreviewDocument = true;
    this.searchType = "";
    this.tramiteForm = {
      tipoDocumento: "DNI",
      numeroDocumento: "",
      nombres: "",
      apellidos: "",
      email: "",
      telefono: "",
      tipoTramite: "",
      asunto: "",
      descripcion: "",
      captchaToken: "",
      captchaCode: "",
      archivos: []
    };
    this.tiposDocumento = [
      { value: "DNI", label: "DNI", maxLength: 15, pattern: "[0-9]{8,15}", placeholder: "12345678" },
      { value: "CARNET_EXTRANJERIA", label: "Carnet de Extranjer\xEDa", maxLength: 15, pattern: "[0-9]{8,15}", placeholder: "123456789" },
      { value: "PASAPORTE", label: "Pasaporte", maxLength: 15, pattern: "[0-9]{8,15}", placeholder: "12345678" }
    ];
    this.archivosPreview = [];
    this.captchaImage = null;
    this.isLoadingCaptcha = false;
    this.isSubmittingTramite = false;
    this.successMessage = "";
    this.showToast = false;
    this.toastMessage = "";
    this.toastType = "error";
    this.tiposTramite = [
      { value: "SOLICITUD_CERTIFICADO", label: "Solicitud de Certificado" },
      { value: "SOLICITUD_CONSTANCIA", label: "Solicitud de Constancia" },
      { value: "RECLAMO", label: "Reclamo" },
      { value: "CONSULTA", label: "Consulta" }
    ];
  }
  ngOnInit() {
    this.searchSubject.pipe(debounceTime(300), distinctUntilChanged()).subscribe((query) => {
      this.performSearch(query);
    });
    this.route.queryParams.subscribe((params) => {
      const qrCode = params["qr"];
      if (qrCode) {
        this.searchByQRCode(qrCode);
      }
    });
  }
  ngOnDestroy() {
    this.searchSubject.complete();
  }
  onSearchChange() {
    this.showError = false;
    this.showSuccess = false;
    this.selectedResult = null;
    if (this.searchQuery.length >= 3) {
      this.isSearching = true;
      this.searchSubject.next(this.searchQuery);
    } else {
      this.possibleMatches = [];
    }
  }
  performSearch(query) {
    if (/^TRM-/.test(query.toUpperCase()) || query.includes("-")) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = "\u26A0\uFE0F Solo se permite buscar por N\xFAmero de Documento de Identidad. No se aceptan c\xF3digos de tr\xE1mite.";
      return;
    }
    if (/[a-zA-Z]/.test(query) && /\d/.test(query) && !/^[A-Z0-9]+$/.test(query.toUpperCase())) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = "\u26A0\uFE0F Solo se permite buscar por N\xFAmero de Documento de Identidad (DNI, Carnet de Extranjer\xEDa o Pasaporte).";
      return;
    }
    if (/\s/.test(query)) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = "\u26A0\uFE0F Solo se permite buscar por N\xFAmero de Documento de Identidad. No se acepta texto libre.";
      return;
    }
    const isDNI = /^\d{8}$/.test(query);
    const isCarnetExtranjeria = /^[A-Z0-9]{9,12}$/.test(query.toUpperCase());
    const isPasaporte = /^[A-Z0-9]{6,12}$/.test(query.toUpperCase());
    if (!isDNI && !isCarnetExtranjeria && !isPasaporte) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = "\u26A0\uFE0F Formato de documento inv\xE1lido. DNI: 8 d\xEDgitos, Carnet de Extranjer\xEDa: 9-12 caracteres alfanum\xE9ricos, Pasaporte: 6-12 caracteres alfanum\xE9ricos.";
      return;
    }
    this.searchType = "dni";
    this.http.get(`${this.apiUrl}/api/tramites/public/buscar?dni=${encodeURIComponent(query)}&size=8`).pipe(catchError(() => {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = `No se encontraron tr\xE1mites asociados al documento "${query}". Verifica el n\xFAmero de documento.`;
      return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0, first: true, last: true, numberOfElements: 0, empty: true });
    })).subscribe((response) => {
      this.isSearching = false;
      if (response.content && response.content.length > 0) {
        this.possibleMatches = response.content.map((tramite) => ({
          id: tramite.id,
          codigo: tramite.codigo,
          expediente: tramite.numeroExpediente || tramite.codigo,
          fecha: this.formatDate(tramite.fechaCreacion),
          tipo: tramite.tipo,
          estado: typeof tramite.estado === "string" ? tramite.estado : tramite.estado.nombre || "N/A",
          descripcion: tramite.descripcion,
          titulo: tramite.titulo,
          solicitante: tramite.usuarioSolicitante ? `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : "N/A",
          area: tramite.areaActual?.nombre || "N/A"
        }));
        this.showSuccess = false;
        this.showError = false;
        this.errorMessage = "";
      } else {
        this.possibleMatches = [];
        this.showSuccess = false;
        this.showError = true;
        this.errorMessage = `No se encontraron tr\xE1mites asociados al documento "${query}".`;
      }
    });
  }
  search() {
    if (!this.searchQuery)
      return;
    this.isSearching = true;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = "";
    this.http.get(`${this.apiUrl}/api/tramites/public/buscar?codigo=${encodeURIComponent(this.searchQuery)}&size=1`).pipe(catchError((error) => {
      let errorMsg = "Error en la b\xFAsqueda. Intente nuevamente.";
      if (error.status === 404) {
        errorMsg = `No se encontr\xF3 el expediente "${this.searchQuery}". Verifique el n\xFAmero e intente nuevamente.`;
      } else if (error.status === 400) {
        errorMsg = "Formato de expediente inv\xE1lido. Verifique el n\xFAmero ingresado.";
      } else if (error.status === 0) {
        errorMsg = "No se puede conectar con el servidor. Verifique su conexi\xF3n.";
      }
      this.errorMessage = errorMsg;
      return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0, first: true, last: true, numberOfElements: 0, empty: true });
    })).subscribe((response) => {
      this.isSearching = false;
      if (response.content && response.content.length > 0) {
        const tramite = response.content[0];
        const searchResult = {
          id: tramite.id,
          codigo: tramite.codigo,
          expediente: tramite.numeroExpediente || tramite.codigo,
          fecha: this.formatDate(tramite.fechaCreacion),
          tipo: tramite.tipo,
          estado: typeof tramite.estado === "string" ? tramite.estado : tramite.estado?.nombre || "N/A",
          descripcion: tramite.descripcion,
          titulo: tramite.titulo,
          solicitante: tramite.usuarioSolicitante ? `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : "N/A",
          area: tramite.areaActual?.nombre || "N/A"
        };
        this.selectedResult = searchResult;
        this.selectedTramite = tramite;
        this.showSuccess = true;
        this.possibleMatches = [];
      } else {
        this.showError = true;
        this.selectedResult = null;
        this.selectedTramite = null;
        if (!this.errorMessage) {
          this.errorMessage = `No se encontr\xF3 el expediente "${this.searchQuery}". Verifique el n\xFAmero e intente nuevamente.`;
        }
      }
    });
  }
  selectResult(result) {
    this.selectedResult = result;
    this.searchQuery = result.expediente;
    this.possibleMatches = [];
    this.showSuccess = true;
  }
  searchByQRCode(qrCode) {
    this.isSearching = true;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = "";
    this.http.get(`${this.apiUrl}/api/qr/verificar/${qrCode}`).pipe(catchError((error) => {
      let errorMsg = "Error verificando el c\xF3digo QR.";
      if (error.status === 404) {
        errorMsg = "C\xF3digo QR no v\xE1lido o tr\xE1mite no encontrado.";
      } else if (error.status === 400) {
        errorMsg = "Formato de c\xF3digo QR inv\xE1lido.";
      } else if (error.status === 0) {
        errorMsg = "No se puede conectar con el servidor.";
      }
      this.errorMessage = errorMsg;
      this.showError = true;
      this.isSearching = false;
      return of(null);
    })).subscribe((response) => {
      this.isSearching = false;
      if (response && response.tramite) {
        const tramite = response.tramite;
        const searchResult = {
          id: tramite.id || 0,
          codigo: tramite.codigo,
          expediente: tramite.numeroExpediente || tramite.codigo,
          fecha: this.formatDate(tramite.fechaCreacion),
          tipo: tramite.tipo,
          estado: typeof tramite.estado === "string" ? tramite.estado : tramite.estado?.nombre || "N/A",
          descripcion: tramite.asunto || "N/A",
          titulo: tramite.asunto || "N/A",
          solicitante: "N/A",
          area: "N/A"
        };
        this.selectedResult = searchResult;
        this.searchQuery = searchResult.codigo;
        this.showSuccess = true;
        this.possibleMatches = [];
        this.router.navigate(["/buscar"], { queryParams: {} });
      }
    });
  }
  clearSearch() {
    this.searchQuery = "";
    this.selectedResult = null;
    this.selectedTramite = null;
    this.possibleMatches = [];
    this.showError = false;
    this.showSuccess = false;
  }
  getStatusClass(status) {
    const classes = {
      "Aprobado": "bg-green-100 text-green-700",
      "Completado": "bg-green-100 text-green-700",
      "En Proceso": "bg-yellow-100 text-yellow-700",
      "Pendiente": "bg-orange-100 text-orange-700",
      "Rechazado": "bg-red-100 text-red-700"
    };
    return classes[status] || "bg-gray-100 text-gray-700";
  }
  viewDocument() {
    if (!this.selectedResult)
      return;
    this.loadingDocuments = true;
    this.errorMessage = "";
    this.http.get(`${this.apiUrl}/api/tramites/public/preview/${this.selectedResult.codigo}`).pipe(catchError((error) => {
      this.loadingDocuments = false;
      if (error.status === 404) {
        this.errorMessage = "\u274C Tr\xE1mite no encontrado. El expediente podr\xEDa no existir o no est\xE1 disponible p\xFAblicamente.";
      } else if (error.status === 403) {
        this.errorMessage = "\u{1F512} Acceso denegado. Este tr\xE1mite no est\xE1 disponible para consulta p\xFAblica.";
      } else if (error.status === 0) {
        this.errorMessage = "\u{1F310} Sin conexi\xF3n. Verifica tu conexi\xF3n a internet e intenta nuevamente.";
      } else {
        this.errorMessage = "\u26A0\uFE0F Error al cargar el documento. Por favor, intenta nuevamente m\xE1s tarde.";
      }
      this.showError = true;
      return of(null);
    })).subscribe((tramite) => {
      this.loadingDocuments = false;
      if (!tramite) {
        return;
      }
      if (tramite.documentosAdjuntos && tramite.documentosAdjuntos.length > 0) {
        this.documentos = tramite.documentosAdjuntos;
      } else {
        this.documentos = [];
      }
      this.showDocumentsModal = true;
      this.showError = false;
    });
  }
  viewSpecificDocument(documento) {
    if (!this.selectedResult || !documento)
      return;
    this.currentDocument = documento;
    this.loadingDocuments = true;
    const previewableTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "text/plain"
    ];
    this.canPreviewDocument = previewableTypes.some((type) => documento.tipo?.toLowerCase().includes(type.toLowerCase()));
    if (documento.contenido) {
      try {
        const byteCharacters = atob(documento.contenido);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: documento.tipo || "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showPdfViewer = true;
        this.loadingDocuments = false;
      } catch (error) {
        this.loadingDocuments = false;
        this.errorMessage = "\u26A0\uFE0F Error al procesar el documento.";
      }
    } else {
      this.http.get(`${this.apiUrl}/api/tramites/public/${this.selectedResult.codigo}/archivo/${documento.nombre}`, {
        responseType: "blob"
      }).pipe(catchError((error) => {
        this.loadingDocuments = false;
        if (error.status === 404) {
          this.errorMessage = "\u274C Documento no encontrado. El archivo podr\xEDa haber sido eliminado.";
        } else {
          this.errorMessage = "\u26A0\uFE0F Error al cargar el documento. Intenta nuevamente.";
        }
        return of(null);
      })).subscribe((blob) => {
        this.loadingDocuments = false;
        if (blob) {
          const url = URL.createObjectURL(blob);
          this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.showPdfViewer = true;
        }
      });
    }
  }
  closeDocumentsModal() {
    this.showDocumentsModal = false;
    this.documentos = [];
  }
  formatFileSize(bytes) {
    if (bytes === 0)
      return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  }
  getFileIcon(tipo) {
    if (tipo.includes("pdf"))
      return "fas fa-file-pdf";
    if (tipo.includes("word") || tipo.includes("doc"))
      return "fas fa-file-word";
    if (tipo.includes("excel") || tipo.includes("sheet"))
      return "fas fa-file-excel";
    if (tipo.includes("image") || tipo.includes("png") || tipo.includes("jpg"))
      return "fas fa-file-image";
    return "fas fa-file";
  }
  closePdfViewer() {
    this.showPdfViewer = false;
    this.pdfUrl = null;
  }
  viewResponseDocument(archivo) {
    if (!archivo)
      return;
    this.currentDocument = archivo;
    this.loadingDocuments = true;
    const previewableTypes = [
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "text/plain"
    ];
    this.canPreviewDocument = previewableTypes.some((type) => archivo.tipo?.toLowerCase().includes(type.toLowerCase()));
    if (archivo.contenido) {
      try {
        const byteCharacters = atob(archivo.contenido);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: archivo.tipo || "application/octet-stream" });
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showPdfViewer = true;
        this.loadingDocuments = false;
      } catch (error) {
        this.loadingDocuments = false;
        this.errorMessage = "\u26A0\uFE0F Error al procesar el archivo de respuesta.";
      }
    } else {
      this.loadingDocuments = false;
      this.errorMessage = "\u26A0\uFE0F El contenido del archivo no est\xE1 disponible.";
    }
  }
  formatDate(dateString) {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-PE", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      });
    } catch {
      return dateString;
    }
  }
  goHome() {
    const user = this.authService.currentUserValue;
    if (!user || !user.role) {
      this.router.navigate(["/"]);
      return;
    }
    const roleName = user.role.name.toUpperCase();
    switch (roleName) {
      case "USUARIO":
        this.router.navigate(["/usuario/mis-tramites"]);
        break;
      case "ADMINISTRATIVO":
        this.router.navigate(["/administrativo/dashboard"]);
        break;
      case "ADMIN":
        this.router.navigate(["/admin/dashboard"]);
        break;
      case "ESTUDIANTE":
        this.router.navigate(["/estudiante/tablero"]);
        break;
      default:
        this.router.navigate(["/"]);
    }
  }
  navigateToSearch() {
    this.currentView = "search";
    this.clearSearch();
  }
  navigateToCreate() {
    this.currentView = "create";
    this.resetCreateForm();
    this.generateCaptcha();
  }
  backToLanding() {
    this.currentView = "landing";
    this.clearSearch();
    this.resetCreateForm();
  }
  resetCreateForm() {
    this.tramiteForm = {
      tipoDocumento: "DNI",
      numeroDocumento: "",
      nombres: "",
      apellidos: "",
      email: "",
      telefono: "",
      tipoTramite: "",
      asunto: "",
      descripcion: "",
      captchaToken: "",
      captchaCode: "",
      archivos: []
    };
    this.archivosPreview = [];
    this.captchaImage = null;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = "";
    this.successMessage = "";
  }
  generateCaptcha() {
    this.isLoadingCaptcha = true;
    this.errorMessage = "";
    this.http.get(`${this.apiUrl}/api/captcha/generar`).pipe(catchError(() => {
      this.isLoadingCaptcha = false;
      this.errorMessage = "Error al generar el CAPTCHA. Intenta nuevamente.";
      return of(null);
    })).subscribe((response) => {
      this.isLoadingCaptcha = false;
      if (response) {
        this.captchaImage = response.image;
        this.tramiteForm.captchaToken = response.token;
      }
    });
  }
  onFilesSelected(event) {
    const files = event.target.files;
    const totalFiles = (this.tramiteForm.archivos?.length || 0) + files.length;
    if (totalFiles > 3) {
      this.showToastMessage("\u26A0\uFE0F M\xE1ximo 3 archivos permitidos en total", "warning");
      event.target.value = "";
      return;
    }
    const validExtensions = ["pdf", "docx"];
    const maxSize = 50 * 1024 * 1024;
    if (!this.tramiteForm.archivos) {
      this.tramiteForm.archivos = [];
    }
    if (!this.archivosPreview) {
      this.archivosPreview = [];
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split(".").pop()?.toLowerCase();
      if (!extension || !validExtensions.includes(extension)) {
        this.showToastMessage(`\u274C Archivo "${file.name}" no permitido. Solo se permiten: ${validExtensions.join(", ")}`, "error");
        event.target.value = "";
        return;
      }
      if (file.size > maxSize) {
        this.showToastMessage(`\u274C Archivo "${file.name}" excede el tama\xF1o m\xE1ximo de 50MB`, "error");
        event.target.value = "";
        return;
      }
      this.tramiteForm.archivos.push(file);
      const fileType = file.type.startsWith("image/") ? "image" : file.type === "application/pdf" ? "pdf" : "document";
      if (fileType === "image") {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.archivosPreview.push({
            file,
            preview: e.target.result,
            type: fileType
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.archivosPreview.push({
          file,
          type: fileType
        });
      }
    }
    this.showError = false;
    this.errorMessage = "";
    event.target.value = "";
  }
  removeFile(index) {
    this.tramiteForm.archivos.splice(index, 1);
    this.archivosPreview.splice(index, 1);
  }
  getTipoDocumentoConfig() {
    return this.tiposDocumento.find((t) => t.value === this.tramiteForm.tipoDocumento) || this.tiposDocumento[0];
  }
  isFormComplete() {
    const tipoDoc = this.getTipoDocumentoConfig();
    const numeroDocRegex = new RegExp(tipoDoc.pattern);
    const numeroDocumentoValido = this.tramiteForm.numeroDocumento && numeroDocRegex.test(this.tramiteForm.numeroDocumento) && this.isValidNumeroDocumento(this.tramiteForm.numeroDocumento);
    const camposObligatorios = !!(this.tramiteForm.tipoDocumento && numeroDocumentoValido && this.tramiteForm.nombres?.trim() && this.tramiteForm.apellidos?.trim() && this.tramiteForm.email?.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.tramiteForm.email) && this.tramiteForm.tipoTramite && this.tramiteForm.asunto?.trim() && this.tramiteForm.asunto.length <= 200 && this.tramiteForm.captchaCode?.trim());
    const telefonoValido = !this.tramiteForm.telefono || this.tramiteForm.telefono.trim() === "" || this.tramiteForm.telefono.length === 9 && this.isValidCelular(this.tramiteForm.telefono);
    const descripcionValida = !this.tramiteForm.descripcion || this.tramiteForm.descripcion.trim() === "" || this.tramiteForm.descripcion.length <= 2e3;
    return camposObligatorios && telefonoValido && descripcionValida;
  }
  showToastMessage(message, type = "error") {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
    }, 4e3);
  }
  onNumericInput(event, field) {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    if (inputValue !== numericValue) {
      event.target.value = numericValue;
      this.tramiteForm[field] = numericValue;
    }
  }
  isValidNumero(numero) {
    if (numero.length < 8)
      return false;
    const primerDigito = numero[0];
    const todosIguales = numero.split("").every((digit) => digit === primerDigito);
    if (todosIguales) {
      return false;
    }
    let esSecuenciaAscendente = true;
    for (let i = 0; i < numero.length - 1; i++) {
      const actual = parseInt(numero[i]);
      const siguiente = parseInt(numero[i + 1]);
      if (siguiente !== actual + 1) {
        esSecuenciaAscendente = false;
        break;
      }
    }
    if (esSecuenciaAscendente) {
      return false;
    }
    let esSecuenciaDescendente = true;
    for (let i = 0; i < numero.length - 1; i++) {
      const actual = parseInt(numero[i]);
      const siguiente = parseInt(numero[i + 1]);
      if (siguiente !== actual - 1) {
        esSecuenciaDescendente = false;
        break;
      }
    }
    if (esSecuenciaDescendente) {
      return false;
    }
    return true;
  }
  isValidCelular(celular) {
    if (celular.length !== 9)
      return false;
    return this.isValidNumero(celular);
  }
  isValidNumeroDocumento(numeroDoc) {
    if (numeroDoc.length < 8 || numeroDoc.length > 15)
      return false;
    return this.isValidNumero(numeroDoc);
  }
  submitTramite() {
    if (!this.validateTramiteForm()) {
      return;
    }
    this.isSubmittingTramite = true;
    this.showError = false;
    this.errorMessage = "";
    const formData = new FormData();
    formData.append("tipoDocumento", this.tramiteForm.tipoDocumento);
    formData.append("numeroDocumento", this.tramiteForm.numeroDocumento);
    formData.append("nombres", this.tramiteForm.nombres);
    formData.append("apellidos", this.tramiteForm.apellidos);
    formData.append("email", this.tramiteForm.email);
    if (this.tramiteForm.telefono) {
      formData.append("telefono", this.tramiteForm.telefono);
    }
    formData.append("tipoTramite", this.tramiteForm.tipoTramite);
    formData.append("asunto", this.tramiteForm.asunto);
    formData.append("descripcion", this.tramiteForm.descripcion);
    formData.append("captchaToken", this.tramiteForm.captchaToken);
    formData.append("captchaCode", this.tramiteForm.captchaCode);
    this.tramiteForm.archivos.forEach((file) => {
      formData.append("archivos", file);
    });
    this.http.post(`${this.apiUrl}/api/tramites/public/crear`, formData).pipe(catchError((error) => {
      this.isSubmittingTramite = false;
      this.showError = true;
      if (error.error && error.error.mensaje) {
        this.errorMessage = error.error.mensaje;
      } else if (error.error && error.error.error) {
        this.errorMessage = error.error.error;
      } else if (error.status === 400) {
        this.errorMessage = "Datos inv\xE1lidos. Verifica el formulario.";
      } else if (error.status === 403) {
        this.errorMessage = "Contenido malicioso detectado. Por favor, revisa tu informaci\xF3n.";
      } else {
        this.errorMessage = error.error?.mensaje || "Error al crear el tr\xE1mite. Intenta nuevamente.";
      }
      this.generateCaptcha();
      return of(null);
    })).subscribe((response) => {
      this.isSubmittingTramite = false;
      if (response && response.codigo) {
        const codigo = response.codigo;
        this.showToastMessage(`\u2705 Tr\xE1mite creado exitosamente con c\xF3digo: ${codigo}`, "success");
        this.showSuccess = true;
        this.showError = false;
        this.successMessage = `Tr\xE1mite creado exitosamente con c\xF3digo: ${codigo}`;
        this.resetCreateForm();
        setTimeout(() => {
          this.backToLanding();
        }, 4e3);
      }
    });
  }
  validateTramiteForm() {
    const tipoDoc = this.getTipoDocumentoConfig();
    const numeroDocRegex = new RegExp(tipoDoc.pattern);
    if (!this.tramiteForm.numeroDocumento || !numeroDocRegex.test(this.tramiteForm.numeroDocumento)) {
      this.showToastMessage(`\u274C N\xFAmero de documento inv\xE1lido. Debe contener entre 8 y 15 d\xEDgitos num\xE9ricos`, "error");
      return false;
    }
    if (!/^[0-9]+$/.test(this.tramiteForm.numeroDocumento)) {
      this.showToastMessage("\u274C El n\xFAmero de documento solo debe contener n\xFAmeros", "error");
      return false;
    }
    if (!this.isValidNumeroDocumento(this.tramiteForm.numeroDocumento)) {
      this.showToastMessage("\u274C El n\xFAmero de documento no es v\xE1lido. No puede ser n\xFAmeros repetidos (ej: 88888888) ni secuenciales (ej: 12345678 o 98765432)", "error");
      return false;
    }
    if (!this.tramiteForm.nombres || !this.tramiteForm.nombres.trim()) {
      this.showToastMessage("\u274C El campo Nombres es obligatorio", "error");
      return false;
    }
    if (!this.tramiteForm.apellidos || !this.tramiteForm.apellidos.trim()) {
      this.showToastMessage("\u274C El campo Apellidos es obligatorio", "error");
      return false;
    }
    if (!this.tramiteForm.email || !this.tramiteForm.email.trim()) {
      this.showToastMessage("\u274C El correo electr\xF3nico es obligatorio", "error");
      return false;
    }
    if (!/@/.test(this.tramiteForm.email)) {
      this.showToastMessage("\u274C El correo debe contener el s\xEDmbolo @", "error");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.tramiteForm.email)) {
      this.showToastMessage("\u274C Ingrese un correo electr\xF3nico v\xE1lido (ejemplo: correo@dominio.com)", "error");
      return false;
    }
    if (this.tramiteForm.telefono && this.tramiteForm.telefono.trim() !== "") {
      if (!/^[0-9]+$/.test(this.tramiteForm.telefono)) {
        this.showToastMessage("\u274C El celular solo debe contener n\xFAmeros", "error");
        return false;
      }
      if (!/^[0-9]{9}$/.test(this.tramiteForm.telefono)) {
        this.showToastMessage("\u274C El celular debe contener exactamente 9 d\xEDgitos", "error");
        return false;
      }
      if (!this.isValidCelular(this.tramiteForm.telefono)) {
        this.showToastMessage("\u274C El n\xFAmero de celular no es v\xE1lido. No puede ser n\xFAmeros repetidos (ej: 999999999) ni secuenciales (ej: 123456789 o 987654321)", "error");
        return false;
      }
    }
    if (!this.tramiteForm.tipoTramite) {
      this.showToastMessage("\u274C Debe seleccionar un Tipo de Tr\xE1mite", "error");
      return false;
    }
    if (!this.tramiteForm.asunto || !this.tramiteForm.asunto.trim()) {
      this.showToastMessage("\u274C El campo Asunto es obligatorio", "error");
      return false;
    }
    if (this.tramiteForm.asunto.length > 200) {
      this.showToastMessage("\u26A0\uFE0F El Asunto no puede exceder los 200 caracteres", "warning");
      return false;
    }
    if (this.tramiteForm.descripcion && this.tramiteForm.descripcion.length > 2e3) {
      this.showToastMessage("\u26A0\uFE0F La Descripci\xF3n no puede exceder los 2000 caracteres", "warning");
      return false;
    }
    if (!this.tramiteForm.captchaCode || !this.tramiteForm.captchaCode.trim()) {
      this.showToastMessage("\u274C Debe ingresar el c\xF3digo CAPTCHA", "error");
      return false;
    }
    return true;
  }
  static {
    this.\u0275fac = function SearchComponent_Factory(t) {
      return new (t || _SearchComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(DomSanitizer), \u0275\u0275directiveInject(HttpClient), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchComponent, selectors: [["app-search"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 30, vars: 10, consts: [["fileInput", ""], [1, "relative", "py-8", "px-4", "min-h-[60vh]", 3, "ngClass"], [1, "max-w-6xl", "mx-auto"], ["class", "animate-fade-in", 4, "ngIf"], [1, "w-full", "px-4", "md:px-8", "lg:px-12", "xl:px-16", "2xl:px-24", "mt-12"], [1, "bg-gradient-to-br", "from-university-600", "to-university-700", "rounded-2xl", "shadow-2xl", "overflow-hidden"], [1, "p-4", "md:p-5", "bg-gradient-to-r", "from-university-600", "to-university-700"], [1, "flex", "items-center", "gap-3", "md:gap-4"], [1, "flex-shrink-0", "w-10", "h-10", "md:w-12", "md:h-12", "bg-white/20", "rounded-lg", "flex", "items-center", "justify-center", "backdrop-blur-sm"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "md:w-6", "md:h-6", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 11a3 3 0 11-6 0 3 3 0 016 0z"], [1, "flex-1"], [1, "text-lg", "md:text-xl", "lg:text-2xl", "font-bold", "text-white", "mb-1"], [1, "flex", "flex-wrap", "items-center", "gap-x-4", "gap-y-1", "text-xs", "md:text-sm"], [1, "text-university-100", "flex", "items-center", "gap-1"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3", "md:w-4", "md:h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"], [1, "text-university-200", "flex", "items-center", "gap-1"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "relative", "w-full", "h-72", "sm:h-96", "md:h-[450px]", "lg:h-[500px]", "xl:h-[550px]", "2xl:h-[600px]", "bg-gray-100"], ["src", \u0275\u0275trustConstantResourceUrl`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.016368444724!2d-80.4470535240123!3d-3.5837152963904466!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x90338cc58cf0153b%3A0xaa242886f950c791!2sUniversidad%20Nacional%20de%20Tumbes!5e0!3m2!1ses-419!2spe!4v1762263169660!5m2!1ses-419!2spe`, "width", "100%", "height", "100%", "allowfullscreen", "", "loading", "lazy", "referrerpolicy", "no-referrer-when-downgrade", 2, "border", "0", "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%"], ["class", "fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in", 4, "ngIf"], ["class", "fixed top-4 right-4 z-50 transform transition-all duration-300 ease-in-out animate-slide-in-right", 3, "animate-slide-out-right", 4, "ngIf"], [1, "animate-fade-in"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6", "md:gap-8"], [1, "group", "cursor-pointer", "rounded-2xl", "shadow-lg", "p-8", "transition-all", "hover:shadow-2xl", "hover:scale-105", 3, "click", "ngClass"], [1, "flex", "flex-col", "items-center", "text-center", "space-y-6"], [1, "w-20", "h-20", "rounded-full", "bg-gradient-to-br", "from-university-500", "to-university-600", "flex", "items-center", "justify-center", "group-hover:scale-110", "transition-transform"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-10", "h-10", "text-white"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 4v16m8-8H4"], [1, "text-2xl", "font-bold", "mb-2", 3, "ngClass"], [1, "text-sm", 3, "ngClass"], [1, "flex", "items-center", "gap-2", "text-university-600"], [1, "text-sm", "font-medium"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "group-hover:translate-x-2", "transition-transform"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 5l7 7-7 7"], [1, "w-20", "h-20", "rounded-full", "bg-gradient-to-br", "from-green-500", "to-green-600", "flex", "items-center", "justify-center", "group-hover:scale-110", "transition-transform"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"], [1, "flex", "items-center", "gap-2", "text-green-600"], [1, "mb-6", "flex", "items-center", "gap-2", "text-university-600", "hover:text-university-700", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 19l-7-7 7-7"], [1, "font-medium"], [1, "rounded-xl", "shadow-lg", "p-6", "md:p-8", "animate-slide-up", "delay-200", 3, "ngClass"], [1, "mb-6"], [1, "block", "text-sm", "font-medium", "mb-2", 3, "ngClass"], [1, "text-xs", "mb-2", "flex", "items-center", "gap-1", 3, "ngClass"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-3", "h-3"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "relative"], ["type", "text", "placeholder", "Ej: 52525252 (ingrese su n\xFAmero de documento)", "maxlength", "50", 1, "w-full", "px-4", "py-3", "border-2", "rounded-lg", "focus:outline-none", "transition-colors", "text-lg", 3, "ngModelChange", "ngModel", "ngClass"], ["class", "absolute right-4 top-4", 4, "ngIf"], ["class", "mt-2 flex items-center gap-2 flex-wrap", 4, "ngIf"], ["class", "mt-3 p-3 border rounded-lg", 3, "ngClass", 4, "ngIf"], ["class", "mt-4 max-h-48 overflow-y-auto border rounded-lg shadow-sm", 3, "ngClass", 4, "ngIf"], [1, "w-full", "btn-university", "px-6", "py-3", "rounded-lg", "font-medium", "text-lg", "disabled:opacity-50", "disabled:cursor-not-allowed", "transition-all", 3, "click", "disabled"], [1, "flex", "items-center", "justify-center"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "mr-2"], ["class", "mt-8 bg-white rounded-xl shadow-lg p-6 md:p-8 animate-slide-up", 4, "ngIf"], [1, "absolute", "right-4", "top-4"], [1, "w-5", "h-5", "border-2", "border-university-500", "border-t-transparent", "rounded-full", "animate-rotate"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-green-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M5 13l4 4L19 7"], [1, "mt-2", "flex", "items-center", "gap-2", "flex-wrap"], ["class", "px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1", 4, "ngIf"], ["class", "px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full flex items-center gap-1", 4, "ngIf"], ["class", "px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1", 4, "ngIf"], ["class", "flex items-center gap-1", 4, "ngIf"], ["class", "text-university-600 font-medium", 4, "ngIf"], [1, "px-2", "py-1", "bg-blue-100", "text-blue-700", "text-xs", "font-medium", "rounded-full", "flex", "items-center", "gap-1"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"], [1, "px-2", "py-1", "bg-purple-100", "text-purple-700", "text-xs", "font-medium", "rounded-full", "flex", "items-center", "gap-1"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M7 20l4-16m2 16l4-16M6 9h14M4 15h14"], [1, "px-2", "py-1", "bg-green-100", "text-green-700", "text-xs", "font-medium", "rounded-full", "flex", "items-center", "gap-1"], [1, "flex", "items-center", "gap-1"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4", "animate-spin"], ["cx", "12", "cy", "12", "r", "10", "stroke", "currentColor", "stroke-width", "4", 1, "opacity-25"], ["fill", "currentColor", "d", "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z", 1, "opacity-75"], [1, "text-university-600", "font-medium"], [1, "mt-3", "p-3", "border", "rounded-lg", 3, "ngClass"], [1, "flex", "items-center", "space-x-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-5", "h-5", "text-red-500", "flex-shrink-0"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "mt-4", "max-h-48", "overflow-y-auto", "border", "rounded-lg", "shadow-sm", 3, "ngClass"], ["class", "px-4 py-3 cursor-pointer border-b last:border-0 transition-colors", 3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "px-4", "py-3", "cursor-pointer", "border-b", "last:border-0", "transition-colors", 3, "click", "ngClass"], [1, "flex", "justify-between", "items-start"], [1, "font-medium", 3, "ngClass"], [1, "text-xs", "px-2", "py-1", "bg-gray-100", "rounded-full", 3, "ngClass"], [1, "mt-8", "bg-white", "rounded-xl", "shadow-lg", "p-6", "md:p-8", "animate-slide-up"], [1, "border-b", "border-gray-200", "pb-4", "mb-6"], [1, "flex", "justify-between", "items-start", "flex-wrap", "gap-4"], [1, "text-2xl", "font-bold", "text-university-800", "mb-2"], [1, "text-gray-600"], [1, "px-4", "py-2", "rounded-full", "text-sm", "font-medium"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "space-y-4"], [1, "text-sm", "text-gray-500", "mb-1"], [1, "font-medium", "text-gray-900"], [4, "ngIf"], [1, "mt-8", "flex", "flex-col", "sm:flex-row", "gap-4"], [1, "flex-1", "btn-outline-university", "px-6", "py-3", "rounded-lg", "font-medium", "transition-all", "hover:scale-105", 3, "click"], [1, "flex", "items-center", "justify-center", "gap-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"], [1, "flex-1", "btn-university", "px-6", "py-3", "rounded-lg", "font-medium", "transition-all", "hover:scale-105", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "click", "disabled"], ["class", "w-5 h-5", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["class", "w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin", 4, "ngIf"], ["class", "mt-4 p-4 border-l-4 border-red-500 bg-red-50 rounded-lg animate-slide-up", 4, "ngIf"], ["class", "mt-6 p-6 bg-green-50 border-l-4 border-green-500 rounded-lg animate-fade-in", 4, "ngIf"], [1, "mt-6", "p-6", "bg-green-50", "border-l-4", "border-green-500", "rounded-lg", "animate-fade-in"], [1, "text-lg", "font-bold", "text-green-800", "mb-4", "flex", "items-center", "gap-2"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"], [1, "font-medium", "text-gray-900", "whitespace-pre-wrap"], ["class", "mt-6 pt-6 border-t border-green-200", 4, "ngIf"], [1, "text-sm", "text-gray-600"], [1, "mt-6", "pt-6", "border-t", "border-green-200"], [1, "text-sm", "font-semibold", "text-gray-700", "mb-3", "flex", "items-center", "gap-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"], [1, "grid", "grid-cols-1", "sm:grid-cols-2", "gap-3"], ["class", "flex items-center gap-3 p-3 bg-white border border-green-200 rounded-lg hover:shadow-md transition-shadow", 4, "ngFor", "ngForOf"], [1, "flex", "items-center", "gap-3", "p-3", "bg-white", "border", "border-green-200", "rounded-lg", "hover:shadow-md", "transition-shadow"], [1, "flex-shrink-0"], [1, "text-2xl", "text-university-600"], [1, "flex-1", "min-w-0"], [1, "text-sm", "font-medium", "text-gray-900", "truncate"], [1, "text-xs", "text-gray-500"], ["title", "Ver archivo", 1, "flex-shrink-0", "p-2", "text-university-600", "hover:bg-university-50", "rounded-lg", "transition-colors", 3, "click"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M15 12a3 3 0 11-6 0 3 3 0 016 0z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"], [1, "w-5", "h-5", "border-2", "border-white", "border-t-transparent", "rounded-full", "animate-spin"], [1, "mt-4", "p-4", "border-l-4", "border-red-500", "bg-red-50", "rounded-lg", "animate-slide-up"], [1, "flex", "items-start", "gap-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-red-500", "flex-shrink-0", "mt-0.5"], [1, "font-medium", "text-red-800"], [1, "text-sm", "text-red-600", "mt-1"], ["class", "mb-6 p-4 bg-green-50 border border-green-200 rounded-lg animate-fade-in", 4, "ngIf"], [1, "rounded-xl", "shadow-lg", "p-6", "md:p-8", 3, "ngClass"], [3, "ngSubmit"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6", "mb-6"], [1, "text-red-500"], ["name", "tipoDocumento", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], [3, "value", 4, "ngFor", "ngForOf"], ["type", "text", "name", "numeroDocumento", "pattern", "[0-9]*", "inputmode", "numeric", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "input", "ngModel", "placeholder", "maxlength", "ngClass"], [1, "text-xs", "mt-1", 3, "ngClass"], ["type", "text", "name", "nombres", "placeholder", "Juan Carlos", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], ["type", "text", "name", "apellidos", "placeholder", "P\xE9rez Garc\xEDa", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], ["type", "email", "name", "email", "placeholder", "correo@ejemplo.com", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], [1, "text-gray-400", "text-xs"], ["type", "text", "name", "telefono", "placeholder", "987654321", "maxlength", "9", "pattern", "[0-9]*", "inputmode", "numeric", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "input", "ngModel", "ngClass"], ["name", "tipoTramite", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], ["value", ""], ["type", "text", "name", "asunto", "placeholder", "Breve descripci\xF3n del asunto", "maxlength", "200", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], ["name", "descripcion", "placeholder", "Describa detalladamente su solicitud...", "maxlength", "2000", "rows", "5", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], ["type", "file", "multiple", "", "accept", ".pdf,.jpg,.jpeg,.png,.doc,.docx", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "change", "ngClass"], ["class", "mt-4 grid grid-cols-1 md:grid-cols-3 gap-4", 4, "ngIf"], [1, "mb-6", "p-4", "border-2", "rounded-lg", 3, "ngClass"], [1, "block", "text-sm", "font-medium", "mb-3", 3, "ngClass"], [1, "flex", "items-center", "gap-4", "mb-3"], ["class", "border-2 border-gray-300 rounded-lg p-2 bg-white", 4, "ngIf"], ["type", "button", 1, "px-4", "py-2", "bg-gray-200", "text-gray-700", "rounded-lg", "hover:bg-gray-300", "transition-colors", "disabled:opacity-50", 3, "click", "disabled"], ["type", "text", "name", "captchaCode", "placeholder", "Ingrese el c\xF3digo CAPTCHA", "maxlength", "6", "required", "", 1, "w-full", "px-4", "py-2", "border", "rounded-lg", "focus:outline-none", "focus:ring-2", "focus:ring-university-500", 3, "ngModelChange", "ngModel", "ngClass"], ["class", "mb-6 p-4 bg-red-50 border border-red-200 rounded-lg", 4, "ngIf"], [1, "flex", "gap-4"], ["type", "button", 1, "flex-1", "px-6", "py-3", "border-2", "border-gray-300", "text-gray-700", "rounded-lg", "font-medium", "hover:bg-gray-50", "transition-all", 3, "click"], ["type", "submit", 1, "flex-1", "btn-university", "px-6", "py-3", "rounded-lg", "font-medium", "transition-all", "disabled:opacity-50", "disabled:cursor-not-allowed", 3, "disabled", "title"], [1, "mb-6", "p-4", "bg-green-50", "border", "border-green-200", "rounded-lg", "animate-fade-in"], [1, "flex", "items-center", "gap-3"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-600"], [1, "text-green-800", "font-medium"], [3, "value"], [1, "mt-4", "grid", "grid-cols-1", "md:grid-cols-3", "gap-4"], ["class", "relative border-2 border-university-200 rounded-lg p-3 bg-gray-50 hover:shadow-md transition-all", 4, "ngFor", "ngForOf"], [1, "relative", "border-2", "border-university-200", "rounded-lg", "p-3", "bg-gray-50", "hover:shadow-md", "transition-all"], ["type", "button", 1, "absolute", "-top-2", "-right-2", "bg-red-500", "text-white", "rounded-full", "p-1", "hover:bg-red-600", "transition-colors", "z-10", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-4", "h-4"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M6 18L18 6M6 6l12 12"], ["class", "w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-2", 4, "ngIf"], ["class", "w-full h-32 bg-red-50 rounded-lg flex items-center justify-center mb-2", 4, "ngIf"], ["class", "w-full h-32 bg-blue-50 rounded-lg flex items-center justify-center mb-2", 4, "ngIf"], [1, "text-center"], [1, "text-sm", "font-medium", "text-gray-700", "truncate"], [1, "w-full", "h-32", "bg-gray-100", "rounded-lg", "overflow-hidden", "mb-2"], [1, "w-full", "h-full", "object-cover", 3, "src", "alt"], [1, "w-full", "h-32", "bg-red-50", "rounded-lg", "flex", "items-center", "justify-center", "mb-2"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-16", "h-16", "text-red-500"], ["fill-rule", "evenodd", "d", "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z", "clip-rule", "evenodd"], [1, "w-full", "h-32", "bg-blue-50", "rounded-lg", "flex", "items-center", "justify-center", "mb-2"], ["fill", "currentColor", "viewBox", "0 0 20 20", 1, "w-16", "h-16", "text-blue-500"], ["fill-rule", "evenodd", "d", "M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z", "clip-rule", "evenodd"], [1, "border-2", "border-gray-300", "rounded-lg", "p-2", "bg-white"], ["alt", "CAPTCHA", 1, "h-16", 3, "src"], [1, "mb-6", "p-4", "bg-red-50", "border", "border-red-200", "rounded-lg"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-red-600"], [1, "text-red-800"], [1, "fixed", "inset-0", "bg-black", "bg-opacity-60", "flex", "items-center", "justify-center", "z-50", "p-4", "animate-fade-in"], [1, "bg-white", "rounded-2xl", "shadow-2xl", "w-full", "max-w-2xl", "max-h-[90vh]", "flex", "flex-col", "animate-slide-up"], [1, "flex", "justify-between", "items-center", "p-6", "border-b", "border-gray-200", "bg-gradient-to-r", "from-university-600", "to-university-700"], [1, "text-xl", "font-bold", "text-white", "flex", "items-center", "gap-2"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"], [1, "text-sm", "text-university-100", "mt-1"], [1, "text-white", "hover:text-university-200", "transition-colors", "p-2", "hover:bg-white/10", "rounded-lg", 3, "click"], [1, "flex-1", "overflow-y-auto", "p-6"], ["class", "text-center py-12", 4, "ngIf"], ["class", "space-y-3", 4, "ngIf"], [1, "p-6", "border-t", "border-gray-200", "bg-gray-50"], [1, "w-full", "btn-outline-university", "px-6", "py-3", "rounded-lg", "font-medium", "hover:scale-105", "transition-transform", 3, "click"], [1, "text-center", "py-12"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-16", "h-16", "mx-auto", "text-gray-300", "mb-4"], [1, "text-gray-500", "text-lg"], [1, "space-y-3"], [1, "text-sm", "text-gray-600", "mb-4"], ["class", "group border-2 border-gray-200 rounded-xl p-4 hover:border-university-400 hover:shadow-lg transition-all cursor-pointer bg-gradient-to-r from-white to-gray-50 hover:from-university-50 hover:to-white", 3, "click", 4, "ngFor", "ngForOf"], [1, "group", "border-2", "border-gray-200", "rounded-xl", "p-4", "hover:border-university-400", "hover:shadow-lg", "transition-all", "cursor-pointer", "bg-gradient-to-r", "from-white", "to-gray-50", "hover:from-university-50", "hover:to-white", 3, "click"], [1, "flex", "items-start", "gap-4"], [1, "flex-shrink-0", "w-12", "h-12", "bg-university-100", "rounded-lg", "flex", "items-center", "justify-center", "group-hover:bg-university-200", "transition-colors"], [1, "font-semibold", "text-gray-900", "truncate", "group-hover:text-university-700", "transition-colors"], [1, "flex", "flex-wrap", "gap-3", "mt-2", "text-sm", "text-gray-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-gray-400", "group-hover:text-university-600", "group-hover:translate-x-1", "transition-all"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"], [1, "bg-white", "rounded-lg", "shadow-2xl", "max-w-4xl", "w-full", "max-h-[90vh]", "flex", "flex-col"], [1, "flex", "justify-between", "items-center", "p-4", "border-b", "border-gray-200"], [1, "text-lg", "font-semibold", "text-university-800"], [1, "text-gray-500", "hover:text-gray-700", "transition-colors", 3, "click"], [1, "flex-1", "p-4"], ["class", "w-full h-full min-h-[600px] rounded border border-gray-200", "frameborder", "0", 3, "src", 4, "ngIf"], ["class", "flex flex-col items-center justify-center min-h-[600px] bg-gray-50 rounded-lg border-2 border-dashed border-gray-300", 4, "ngIf"], [1, "p-4", "border-t", "border-gray-200", "bg-gray-50", "flex", "justify-between", "items-center"], [1, "flex", "gap-2"], ["download", "", 1, "btn-outline-university", "px-4", "py-2", "rounded", "font-medium", "text-sm", 3, "href"], [1, "btn-university", "px-4", "py-2", "rounded", "font-medium", "text-sm", 3, "click"], ["frameborder", "0", 1, "w-full", "h-full", "min-h-[600px]", "rounded", "border", "border-gray-200", 3, "src"], [1, "flex", "flex-col", "items-center", "justify-center", "min-h-[600px]", "bg-gray-50", "rounded-lg", "border-2", "border-dashed", "border-gray-300"], [1, "text-center", "max-w-md", "px-6"], [1, "text-6xl", "text-university-600", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-800", "mb-3"], [1, "text-gray-600", "mb-2"], [1, "text-sm", "text-gray-500", "mb-6"], [1, "inline-flex", "items-center", "gap-2", "btn-university", "px-6", "py-3", "rounded-lg", "font-medium", "hover:scale-105", "transition-transform", 3, "href", "download"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"], [1, "mt-4", "pt-4", "border-t", "border-gray-200"], [1, "fixed", "top-4", "right-4", "z-50", "transform", "transition-all", "duration-300", "ease-in-out", "animate-slide-in-right"], [1, "flex", "items-center", "gap-3", "px-6", "py-4", "rounded-lg", "shadow-xl", "max-w-md", 3, "ngClass"], ["class", "w-6 h-6 text-green-500", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["class", "w-6 h-6 text-red-500", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], ["class", "w-6 h-6 text-yellow-500", "fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 4, "ngIf"], [1, "text-sm", "font-medium", 3, "ngClass"], [1, "flex-shrink-0", "text-gray-400", "hover:text-gray-600", "transition-colors", 3, "click"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-green-500"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-red-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"], ["fill", "none", "stroke", "currentColor", "viewBox", "0 0 24 24", 1, "w-6", "h-6", "text-yellow-500"], ["stroke-linecap", "round", "stroke-linejoin", "round", "stroke-width", "2", "d", "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"]], template: function SearchComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "section", 1)(1, "div", 2);
        \u0275\u0275template(2, SearchComponent_div_2_Template, 32, 24, "div", 3)(3, SearchComponent_div_3_Template, 27, 28, "div", 3)(4, SearchComponent_div_4_Template, 104, 142, "div", 3);
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(5, "div", 4)(6, "div", 5)(7, "div", 6)(8, "div", 7)(9, "div", 8);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(10, "svg", 9);
        \u0275\u0275element(11, "path", 10)(12, "path", 11);
        \u0275\u0275elementEnd()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(13, "div", 12)(14, "h3", 13);
        \u0275\u0275text(15, "Ubicaci\xF3n de Mesa de Partes");
        \u0275\u0275elementEnd();
        \u0275\u0275elementStart(16, "div", 14)(17, "span", 15);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(18, "svg", 16);
        \u0275\u0275element(19, "path", 17);
        \u0275\u0275elementEnd();
        \u0275\u0275text(20, " Universidad Nacional de Tumbes ");
        \u0275\u0275elementEnd();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(21, "span", 18);
        \u0275\u0275namespaceSVG();
        \u0275\u0275elementStart(22, "svg", 16);
        \u0275\u0275element(23, "path", 19);
        \u0275\u0275elementEnd();
        \u0275\u0275text(24, " Lunes a Viernes: 7:30 AM - 3:00 PM ");
        \u0275\u0275elementEnd()()()()();
        \u0275\u0275namespaceHTML();
        \u0275\u0275elementStart(25, "div", 20);
        \u0275\u0275element(26, "iframe", 21);
        \u0275\u0275elementEnd()();
        \u0275\u0275template(27, SearchComponent_div_27_Template, 19, 3, "div", 22)(28, SearchComponent_div_28_Template, 19, 6, "div", 22)(29, SearchComponent_div_29_Template, 12, 16, "div", 23);
        \u0275\u0275elementEnd()();
      }
      if (rf & 2) {
        \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(7, _c0, !ctx.isDarkMode, ctx.isDarkMode));
        \u0275\u0275advance(2);
        \u0275\u0275property("ngIf", ctx.currentView === "landing");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentView === "search");
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.currentView === "create");
        \u0275\u0275advance(23);
        \u0275\u0275property("ngIf", ctx.showDocumentsModal);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showPdfViewer);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showToast);
      }
    }, dependencies: [CommonModule, NgClass, NgForOf, NgIf, DatePipe, FormsModule, \u0275NgNoValidate, NgSelectOption, \u0275NgSelectMultipleOption, DefaultValueAccessor, SelectControlValueAccessor, NgControlStatus, NgControlStatusGroup, RequiredValidator, MaxLengthValidator, PatternValidator, NgModel, NgForm], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchComponent, { className: "SearchComponent" });
})();

// src/app/guards/auth.guard.ts
var AuthGuard = class _AuthGuard {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  canActivate(route, state) {
    if (this.authService.isAuthenticated()) {
      return true;
    }
    this.router.navigate(["/servicios-administrativos"], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
  static {
    this.\u0275fac = function AuthGuard_Factory(t) {
      return new (t || _AuthGuard)(\u0275\u0275inject(Router), \u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthGuard, factory: _AuthGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/guards/role.guard.ts
var RoleGuard = class _RoleGuard {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
  }
  canActivate(route, state) {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(["/servicios-administrativos"], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    const expectedRoles = route.data["roles"];
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }
    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.role || !currentUser.role.name) {
      this.router.navigate(["/acceso-denegado"]);
      return false;
    }
    const hasRole = this.authService.hasAnyRole(expectedRoles);
    if (hasRole) {
      return true;
    }
    this.router.navigate(["/acceso-denegado"]);
    return false;
  }
  static {
    this.\u0275fac = function RoleGuard_Factory(t) {
      return new (t || _RoleGuard)(\u0275\u0275inject(Router), \u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _RoleGuard, factory: _RoleGuard.\u0275fac, providedIn: "root" });
  }
};

// src/app/app.routes.ts
var routes = [
  { path: "", component: HomeComponent },
  { path: "ingresar", component: AdminLoginComponent },
  { path: "servicios-administrativos", component: AdminLoginComponent },
  { path: "manual", component: ManualComponent },
  { path: "verificar", component: SearchComponent },
  {
    path: "admin",
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["admin"] },
    loadComponent: () => import("./chunk-OFIB3LBO.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "tablero",
        loadComponent: () => import("./chunk-Y5P5BUPZ.js").then((m) => m.DashboardComponent)
      },
      {
        path: "perfil",
        loadComponent: () => import("./chunk-357JP5VV.js").then((m) => m.UserProfileComponent)
      },
      {
        path: "areas",
        loadComponent: () => import("./chunk-4RAB74G5.js").then((m) => m.AreasComponent)
      },
      {
        path: "gestion-usuarios",
        loadComponent: () => import("./chunk-67Q7EDQR.js").then((m) => m.UserManagementComponent)
      },
      {
        path: "gestion-roles",
        loadComponent: () => import("./chunk-FM65FGOT.js").then((m) => m.RoleManagementComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-BUT7HTAZ.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "notificaciones/:id",
        loadComponent: () => import("./chunk-N4JFH6O4.js").then((m) => m.NotificacionDetalleComponent)
      },
      {
        path: "tramites",
        loadComponent: () => import("./chunk-7L64M4UM.js").then((m) => m.ListaTramitesComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-3UQ4NY7E.js").then((m) => m.ReportesComponent)
      },
      {
        path: "organigrama",
        loadComponent: () => import("./chunk-PDBNPT2B.js").then((m) => m.OrganigramaComponent)
      },
      {
        path: "mis-tramites",
        loadComponent: () => import("./chunk-GYZUYE6H.js").then((m) => m.MisTramitesComponent)
      },
      {
        path: "nuevo-tramite",
        loadComponent: () => import("./chunk-X2TQNJQN.js").then((m) => m.NuevoTramitePageComponent)
      },
      {
        path: "",
        redirectTo: "tablero",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "administrativo",
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["administrativo"] },
    loadComponent: () => import("./chunk-OFIB3LBO.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "tablero",
        loadComponent: () => import("./chunk-ASAQ6FP5.js").then((m) => m.DashboardComponent)
      },
      {
        path: "perfil",
        loadComponent: () => import("./chunk-357JP5VV.js").then((m) => m.UserProfileComponent)
      },
      {
        path: "mis-tramites",
        loadComponent: () => import("./chunk-GYZUYE6H.js").then((m) => m.MisTramitesComponent)
      },
      {
        path: "nuevo-tramite",
        loadComponent: () => import("./chunk-X2TQNJQN.js").then((m) => m.NuevoTramitePageComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-BUT7HTAZ.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "notificaciones/:id",
        loadComponent: () => import("./chunk-N4JFH6O4.js").then((m) => m.NotificacionDetalleComponent)
      },
      {
        path: "reportes",
        loadComponent: () => import("./chunk-3UQ4NY7E.js").then((m) => m.ReportesComponent)
      },
      {
        path: "",
        redirectTo: "tablero",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "usuario",
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["usuario"] },
    loadComponent: () => import("./chunk-OFIB3LBO.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "tablero",
        loadComponent: () => import("./chunk-YPGZJFWP.js").then((m) => m.UsuarioDashboardComponent)
      },
      {
        path: "perfil",
        loadComponent: () => import("./chunk-357JP5VV.js").then((m) => m.UserProfileComponent)
      },
      {
        path: "bandeja-tramites",
        loadComponent: () => import("./chunk-4QV5NXU6.js").then((m) => m.BandejaTramitesComponent)
      },
      {
        path: "mis-tramites",
        loadComponent: () => import("./chunk-GYZUYE6H.js").then((m) => m.MisTramitesComponent)
      },
      {
        path: "nuevo-tramite",
        loadComponent: () => import("./chunk-X2TQNJQN.js").then((m) => m.NuevoTramitePageComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-BUT7HTAZ.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "notificaciones/:id",
        loadComponent: () => import("./chunk-N4JFH6O4.js").then((m) => m.NotificacionDetalleComponent)
      },
      {
        path: "",
        redirectTo: "tablero",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "estudiante",
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ["estudiante"] },
    loadComponent: () => import("./chunk-OFIB3LBO.js").then((m) => m.LayoutComponent),
    children: [
      {
        path: "tablero",
        loadComponent: () => import("./chunk-BW6PMZ3M.js").then((m) => m.EstudianteDashboardComponent)
      },
      {
        path: "perfil",
        loadComponent: () => import("./chunk-357JP5VV.js").then((m) => m.UserProfileComponent)
      },
      {
        path: "mis-tramites",
        loadComponent: () => import("./chunk-GYZUYE6H.js").then((m) => m.MisTramitesComponent)
      },
      {
        path: "nuevo-tramite",
        loadComponent: () => import("./chunk-X2TQNJQN.js").then((m) => m.NuevoTramitePageComponent)
      },
      {
        path: "notificaciones",
        loadComponent: () => import("./chunk-BUT7HTAZ.js").then((m) => m.NotificacionesComponent)
      },
      {
        path: "notificaciones/:id",
        loadComponent: () => import("./chunk-N4JFH6O4.js").then((m) => m.NotificacionDetalleComponent)
      },
      {
        path: "",
        redirectTo: "tablero",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "perfil",
    canActivate: [AuthGuard],
    loadComponent: () => import("./chunk-357JP5VV.js").then((m) => m.UserProfileComponent)
  },
  {
    path: "cambiar-contrasena",
    canActivate: [AuthGuard],
    loadComponent: () => import("./chunk-MWP3TWML.js").then((m) => m.ChangePasswordComponent)
  },
  {
    path: "acceso-denegado",
    loadComponent: () => import("./chunk-VTUELK4T.js").then((m) => m.AccessDeniedComponent)
  },
  { path: "**", redirectTo: "" }
];

// src/app/interceptors/auth.interceptor.ts
var AuthInterceptor = class _AuthInterceptor {
  constructor(authService) {
    this.authService = authService;
    this.isRefreshing = false;
    this.refreshTokenSubject = new BehaviorSubject(null);
  }
  intercept(request, next) {
    const token = this.authService.getToken();
    if (token && !request.url.includes("/auth/")) {
      request = this.addToken(request, token);
    }
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return this.handle401Error(request, next);
      }
      return throwError(() => error);
    }));
  }
  addToken(request, token) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  handle401Error(request, next) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshToken().pipe(switchMap((response) => {
        this.isRefreshing = false;
        this.refreshTokenSubject.next(response.token);
        return next.handle(this.addToken(request, response.token));
      }), catchError((err) => {
        this.isRefreshing = false;
        this.authService.logout();
        return throwError(() => err);
      }));
    } else {
      return this.refreshTokenSubject.pipe(filter((token) => token != null), take(1), switchMap((token) => {
        return next.handle(this.addToken(request, token));
      }));
    }
  }
  static {
    this.\u0275fac = function AuthInterceptor_Factory(t) {
      return new (t || _AuthInterceptor)(\u0275\u0275inject(AuthService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuthInterceptor, factory: _AuthInterceptor.\u0275fac });
  }
};

// src/app/interceptors/http-error.interceptor.ts
var HttpErrorInterceptor = class _HttpErrorInterceptor {
  constructor(router, authService, toastService) {
    this.router = router;
    this.authService = authService;
    this.toastService = toastService;
  }
  intercept(request, next) {
    return next.handle(request).pipe(catchError((error) => {
      if (error.status === 0) {
        if (!error.url?.includes("/api/auth/login")) {
          this.toastService.error("Sin conexi\xF3n al servidor", "Error de Conexi\xF3n");
          this.redirectToHome();
        }
      } else if (error.status === 401) {
      } else if (error.status === 403) {
        if (!error.url?.includes("/usuarios/recent") && !error.url?.includes("/usuarios/stats")) {
          this.toastService.error("No tienes permisos para realizar esta acci\xF3n", "Acceso Denegado");
          this.router.navigate(["/access-denied"]);
        }
      } else if (error.status === 404) {
        this.toastService.error("Recurso no encontrado", "Error 404");
      } else if (error.status >= 500) {
        this.toastService.error("Error interno del servidor", "Error del Servidor");
        this.redirectToHome();
      } else if (error.status === -1 || error instanceof TimeoutError) {
        this.toastService.error("Tiempo de espera agotado", "Error de Conexi\xF3n");
        this.redirectToHome();
      }
      return throwError(() => error);
    }));
  }
  redirectToHome() {
    this.authService.logout();
  }
  static {
    this.\u0275fac = function HttpErrorInterceptor_Factory(t) {
      return new (t || _HttpErrorInterceptor)(\u0275\u0275inject(Router), \u0275\u0275inject(AuthService), \u0275\u0275inject(ToastService));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _HttpErrorInterceptor, factory: _HttpErrorInterceptor.\u0275fac });
  }
};

// src/app/shared/interceptors/api-response.interceptor.ts
var ApiResponseInterceptor = class _ApiResponseInterceptor {
  intercept(request, next) {
    return next.handle(request).pipe(map((event) => {
      if (event instanceof HttpResponse) {
        const response = event.body;
        if (response && typeof response === "object" && "success" in response && "data" in response) {
          const unwrappedData = response.data;
          return event.clone({ body: unwrappedData });
        }
      }
      return event;
    }));
  }
  static {
    this.\u0275fac = function ApiResponseInterceptor_Factory(t) {
      return new (t || _ApiResponseInterceptor)();
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ApiResponseInterceptor, factory: _ApiResponseInterceptor.\u0275fac });
  }
};

// src/app/app.config.ts
var appConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiResponseInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ]
};

// src/app/app.component.ts
function AppComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 4)(1, "div", 5)(2, "div", 6);
    \u0275\u0275element(3, "img", 7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 8)(5, "p", 9);
    \u0275\u0275text(6, "Universidad Nacional de Tumbes");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 10);
    \u0275\u0275element(8, "div", 11)(9, "div", 12)(10, "div", 13);
    \u0275\u0275elementEnd()()();
  }
}
function AppComponent_nav_2_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 21);
    \u0275\u0275listener("click", function AppComponent_nav_2_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goHome());
    });
    \u0275\u0275text(1, " Inicio ");
    \u0275\u0275elementEnd();
  }
}
function AppComponent_nav_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "nav", 14)(1, "div", 15)(2, "div", 16)(3, "div", 17);
    \u0275\u0275listener("click", function AppComponent_nav_2_Template_div_click_3_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goHome());
    });
    \u0275\u0275element(4, "img", 18);
    \u0275\u0275elementStart(5, "div")(6, "h1", 19);
    \u0275\u0275text(7, "Sistema de Secretaria General");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(8, AppComponent_nav_2_button_8_Template, 2, 0, "button", 20);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", ctx_r1.showHomeButton);
  }
}
function AppComponent_main_3_footer_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "footer", 25)(1, "div", 26)(2, "div", 27)(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 28);
    \u0275\u0275text(6, "Acreditada por Sunedu.");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("\xA9 ", ctx_r1.currentYear, " | Universidad Nacional de Tumbes | ");
  }
}
function AppComponent_main_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "main", 22)(1, "div", 23);
    \u0275\u0275element(2, "router-outlet");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, AppComponent_main_3_footer_3_Template, 7, 1, "footer", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classProp("pt-16", ctx_r1.showHeader);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngIf", ctx_r1.showFooter);
  }
}
var AppComponent = class _AppComponent {
  constructor(router, authService) {
    this.router = router;
    this.authService = authService;
    this.isLoading = true;
    this.showContent = false;
    this.showHomeButton = false;
    this.showHeader = true;
    this.showFooter = true;
    this.currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  }
  ngOnInit() {
    this.initializeRoute();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.initializeRoute();
      }
    });
  }
  initializeRoute() {
    const currentUrl = this.router.url;
    const adminRoutes = ["/servicios-administrativos", "/admin", "/administrativo", "/usuario", "/alumno", "/externo", "/estudiante"];
    const loginRoutes = ["/admin-login", "/usuario-login", "/alumno-login", "/externo-login"];
    const userRoutes = ["/perfil", "/cambiar-contrasena"];
    const isAdminRoute = adminRoutes.some((route) => currentUrl.includes(route));
    const isLoginRoute = loginRoutes.some((route) => currentUrl.includes(route));
    const isUserRoute = userRoutes.some((route) => currentUrl.includes(route));
    if (isAdminRoute || isLoginRoute || isUserRoute) {
      this.showHeader = false;
      this.showFooter = false;
      this.showHomeButton = false;
      this.isLoading = false;
      this.showContent = true;
    } else {
      this.showHeader = true;
      this.showFooter = true;
      this.showHomeButton = currentUrl !== "/";
      this.startPreloader();
    }
  }
  startPreloader() {
    this.isLoading = true;
    this.showContent = false;
    setTimeout(() => {
      this.isLoading = false;
      setTimeout(() => {
        this.showContent = true;
      }, 100);
    }, 1500);
  }
  goHome() {
    const user = this.authService.currentUserValue;
    if (!user || !user.role) {
      this.router.navigate(["/"]);
      return;
    }
    const roleName = user.role.name.toUpperCase();
    switch (roleName) {
      case "USUARIO":
        this.router.navigate(["/usuario/mis-tramites"]);
        break;
      case "ADMINISTRATIVO":
        this.router.navigate(["/administrativo/dashboard"]);
        break;
      case "ADMIN":
        this.router.navigate(["/admin/dashboard"]);
        break;
      case "ESTUDIANTE":
        this.router.navigate(["/estudiante/tablero"]);
        break;
      default:
        this.router.navigate(["/"]);
    }
  }
  static {
    this.\u0275fac = function AppComponent_Factory(t) {
      return new (t || _AppComponent)(\u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(AuthService));
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AppComponent, selectors: [["app-root"]], standalone: true, features: [\u0275\u0275StandaloneFeature], decls: 4, vars: 3, consts: [[1, "min-h-screen", "bg-gray-50"], ["class", "fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-university-600 to-university-800", 4, "ngIf"], ["class", "bg-white shadow-sm border-b-4 border-university-500 fixed top-0 left-0 right-0 z-40 transition-transform duration-500", 4, "ngIf"], ["class", "min-h-screen flex flex-col", 3, "pt-16", 4, "ngIf"], [1, "fixed", "inset-0", "z-50", "flex", "items-center", "justify-center", "bg-gradient-to-br", "from-university-600", "to-university-800"], [1, "text-center", "text-white"], [1, "mb-8"], ["src", "assets/logo.png", "alt", "UNTUMBES", 1, "w-20", "h-20", "mx-auto", "rounded-lg", "shadow-2xl", "animate-bounce"], [1, "mb-6"], [1, "text-university-100"], [1, "flex", "justify-center", "space-x-1"], [1, "w-3", "h-3", "bg-white", "rounded-full", "animate-bounce", 2, "animation-delay", "0s"], [1, "w-3", "h-3", "bg-white", "rounded-full", "animate-bounce", 2, "animation-delay", "0.2s"], [1, "w-3", "h-3", "bg-white", "rounded-full", "animate-bounce", 2, "animation-delay", "0.4s"], [1, "bg-white", "shadow-sm", "border-b-4", "border-university-500", "fixed", "top-0", "left-0", "right-0", "z-40", "transition-transform", "duration-500"], [1, "max-w-7xl", "mx-auto", "px-4", "sm:px-6", "lg:px-8"], [1, "flex", "justify-between", "items-center", "h-16"], [1, "flex", "items-center", "space-x-4", "cursor-pointer", 3, "click"], ["src", "assets/logo.png", "alt", "UNTUMBES", 1, "w-12", "h-12", "rounded-lg", "shadow-md"], [1, "text-lg", "font-semibold", "text-university-700", "hover:text-university-600", "transition-colors"], ["class", "btn-university px-4 py-2 rounded-lg font-medium", 3, "click", 4, "ngIf"], [1, "btn-university", "px-4", "py-2", "rounded-lg", "font-medium", 3, "click"], [1, "min-h-screen", "flex", "flex-col"], [1, "flex-1"], ["class", "py-4 bg-university-700 text-white mt-auto", 4, "ngIf"], [1, "py-4", "bg-university-700", "text-white", "mt-auto"], [1, "container", "mx-auto", "px-4"], [1, "flex", "flex-col", "sm:flex-row", "items-center", "justify-center", "text-sm", "text-center", "sm:text-left", "space-y-1", "sm:space-y-0"], [1, "sm:ml-1"]], template: function AppComponent_Template(rf, ctx) {
      if (rf & 1) {
        \u0275\u0275elementStart(0, "div", 0);
        \u0275\u0275template(1, AppComponent_div_1_Template, 11, 0, "div", 1)(2, AppComponent_nav_2_Template, 9, 1, "nav", 2)(3, AppComponent_main_3_Template, 4, 3, "main", 3);
        \u0275\u0275elementEnd();
      }
      if (rf & 2) {
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.isLoading);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showHeader && ctx.showContent);
        \u0275\u0275advance();
        \u0275\u0275property("ngIf", ctx.showContent);
      }
    }, dependencies: [CommonModule, NgIf, RouterOutlet], encapsulation: 2 });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AppComponent, { className: "AppComponent" });
})();

// src/main.ts
if (typeof global === "undefined") {
  window.global = window;
}
if (typeof window.net === "undefined") {
  window.net = {
    Socket: class MockSocket {
    }
  };
}
bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
/*! Bundled license information:

@angular/animations/fesm2022/browser.mjs:
  (**
   * @license Angular v17.3.12
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)

@angular/platform-browser/fesm2022/animations.mjs:
  (**
   * @license Angular v17.3.12
   * (c) 2010-2024 Google LLC. https://angular.io/
   * License: MIT
   *)
*/
//# sourceMappingURL=main.js.map
