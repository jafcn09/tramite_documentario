import {
  HttpClient,
  __spreadProps,
  __spreadValues,
  catchError,
  environment,
  of,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-HL73AAZ4.js";

// src/app/services/organigrama.service.ts
var OrganigramaService = class _OrganigramaService {
  constructor(http) {
    this.http = http;
    this.API_URL = `${environment.apiUrl}/api/organigrama`;
  }
  obtenerOrganigramaCompleto() {
    return this.http.get(`${this.API_URL}/completo`).pipe(catchError((error) => {
      return of([]);
    }));
  }
  obtenerAreasPlanas() {
    return this.http.get(`${this.API_URL}/areas-planas`).pipe(catchError((error) => {
      return of([]);
    }));
  }
  obtenerSubAreas(areaId) {
    return this.http.get(`${this.API_URL}/api/sub-areas/${areaId}`).pipe(catchError((error) => {
      throw error;
    }));
  }
  inicializarEstructura() {
    return this.http.post(`${this.API_URL}/inicializar`, {}).pipe(catchError((error) => {
      throw error;
    }));
  }
  buscarAreaEnOrganigrama(areas, termino) {
    const resultado = [];
    for (const area of areas) {
      if (area.nombre.toLowerCase().includes(termino.toLowerCase()) || area.descripcion?.toLowerCase().includes(termino.toLowerCase()) || area.codigoOrganigrama?.toLowerCase().includes(termino.toLowerCase())) {
        resultado.push(__spreadProps(__spreadValues({}, area), { expanded: true }));
      }
      if (area.subAreas && area.subAreas.length > 0) {
        const subResultados = this.buscarAreaEnOrganigrama(area.subAreas, termino);
        if (subResultados.length > 0) {
          resultado.push(__spreadProps(__spreadValues({}, area), {
            expanded: true,
            subAreas: subResultados
          }));
        }
      }
    }
    return resultado;
  }
  obtenerRutaCompleta(areas, areaId) {
    for (const area of areas) {
      if (area.id === areaId) {
        return area.rutaJerarquica || area.nombre;
      }
      if (area.subAreas && area.subAreas.length > 0) {
        const rutaSubArea = this.obtenerRutaCompleta(area.subAreas, areaId);
        if (rutaSubArea) {
          return rutaSubArea;
        }
      }
    }
    return "";
  }
  aplanarOrganigrama(areas) {
    const resultado = [];
    for (const area of areas) {
      resultado.push(__spreadProps(__spreadValues({}, area), {
        subAreas: []
      }));
      if (area.subAreas && area.subAreas.length > 0) {
        resultado.push(...this.aplanarOrganigrama(area.subAreas));
      }
    }
    return resultado;
  }
  contarTotalAreas(areas) {
    let total = areas.length;
    for (const area of areas) {
      if (area.subAreas && area.subAreas.length > 0) {
        total += this.contarTotalAreas(area.subAreas);
      }
    }
    return total;
  }
  static {
    this.\u0275fac = function OrganigramaService_Factory(t) {
      return new (t || _OrganigramaService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _OrganigramaService, factory: _OrganigramaService.\u0275fac, providedIn: "root" });
  }
};

export {
  OrganigramaService
};
//# sourceMappingURL=chunk-UIOATMJA.js.map
