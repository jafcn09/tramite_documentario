import {
  HttpClient,
  environment,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-VDZBNFIH.js";

// src/app/services/reportes.service.ts
var ReportesService = class _ReportesService {
  constructor(http) {
    this.http = http;
    this.apiUrl = `${environment.apiUrl}/api/reportes`;
  }
  obtenerReporteCompleto(fechaInicio, fechaFin) {
    let params = {};
    if (fechaInicio) {
      params.fechaInicio = fechaInicio.toISOString().split("T")[0];
    }
    if (fechaFin) {
      params.fechaFin = fechaFin.toISOString().split("T")[0];
    }
    return this.http.get(this.apiUrl, { params });
  }
  obtenerResumenGeneral() {
    return this.http.get(`${this.apiUrl}/resumen`);
  }
  obtenerTramitesPorTipo() {
    return this.http.get(`${this.apiUrl}/por-tipo`);
  }
  obtenerTramitesUrgentes() {
    return this.http.get(`${this.apiUrl}/urgentes`);
  }
  obtenerTramitesPorArea() {
    return this.http.get(`${this.apiUrl}/por-area`);
  }
  obtenerTramitesPorUsuario() {
    return this.http.get(`${this.apiUrl}/por-usuario`);
  }
  exportarReporteExcel(fechaInicio, fechaFin) {
    let params = {};
    if (fechaInicio) {
      params.fechaInicio = fechaInicio.toISOString().split("T")[0];
    }
    if (fechaFin) {
      params.fechaFin = fechaFin.toISOString().split("T")[0];
    }
    return this.http.get(`${this.apiUrl}/exportar/excel`, {
      params,
      responseType: "blob"
    });
  }
  exportarReportePDF(fechaInicio, fechaFin) {
    let params = {};
    if (fechaInicio) {
      params.fechaInicio = fechaInicio.toISOString().split("T")[0];
    }
    if (fechaFin) {
      params.fechaFin = fechaFin.toISOString().split("T")[0];
    }
    return this.http.get(`${this.apiUrl}/exportar/pdf`, {
      params,
      responseType: "blob"
    });
  }
  static {
    this.\u0275fac = function ReportesService_Factory(t) {
      return new (t || _ReportesService)(\u0275\u0275inject(HttpClient));
    };
  }
  static {
    this.\u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ReportesService, factory: _ReportesService.\u0275fac, providedIn: "root" });
  }
};

export {
  ReportesService
};
//# sourceMappingURL=chunk-LXQLFYAL.js.map
