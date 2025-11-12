import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ManualSection } from '../shared/interfaces/manual_interface';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manual.component.html'
})
export class ManualComponent {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  showIndex = false; 

  toggleIndex(): void {
    this.showIndex = !this.showIndex;
  }

  manualSections: ManualSection[] = [
    {
      id: 'introduccion',
      title: 'Información General del Sistema',
      content: 'Este sistema es una plataforma digital de gestión de trámites que permite a estudiantes y usuarios realizar solicitudes académico-administrativas de manera eficiente. Ofrece funcionalidades de seguimiento en tiempo real, gestión de documentos digitales y notificaciones automáticas. Proporciona una alternativa moderna a los procesos presenciales, reduciendo tiempos de espera y mejorando la trazabilidad de los trámites.',
    },
    {
      id: 'registro',
      title: 'Acceso al Sistema',
      content: 'El acceso al sistema requiere credenciales de usuario proporcionadas por la institución. Para obtener sus credenciales, debe dirigirse a la Mesa de Partes con su identificación oficial.',
      steps: [
        'Ingrese a la página principal del sistema',
        'Haga clic en el enlace "Iniciar Sesión" ubicado en la barra superior',
        'Ingrese su nombre de usuario en el campo de usuario',
        'Ingrese su contraseña en el campo de contraseña',
        'Haga clic en el botón "Ingresar"',
        'En el primer acceso, se le solicitará cambiar su contraseña por seguridad'
      ]
    },
    {
      id: 'nuevo-tramite',
      title: 'Crear un Nuevo Trámite',
      content: 'La creación de un trámite requiere completar un formulario con información específica y, en algunos casos, adjuntar documentos de soporte. El sistema valida la información ingresada antes de permitir el envío.',
      steps: [
        'Acceda al menú principal del sistema',
        'Seleccione la opción "Nuevo Trámite" o el botón "+',
        'Seleccione el tipo de trámite que desea realizar de la lista desplegable disponible',
        'Complete el campo de asunto con una descripción concisa (ej: "Solicitud de Certificado de Estudios")',
        'En el campo de descripción, proporcione detalles específicos de su solicitud',
        'Adjunte los documentos requeridos haciendo clic en "Adjuntar Archivos" y seleccionando los archivos de su dispositivo',
        'Revise que toda la información sea correcta',
        'Haga clic en el botón "Enviar"',
        'Anote el código de referencia del trámite (formato: TRM-XXXX-XXXX) para consultas posteriores'
      ]
    },
    {
      id: 'seguimiento',
      title: 'Consultar Estado de Trámites',
      content: 'El sistema proporciona dos opciones para consultar el estado de trámites: una para usuarios registrados dentro del sistema y otra para consultas públicas. Los usuarios públicos pueden acceder mediante código QR generado por el sistema o directamente a través de búsqueda por número de documento.',
      steps: [
        '<strong>Para usuarios autenticados:</strong> Acceda a la sección "Mis Trámites" para visualizar todos sus trámites con su estado actual actualizado',
        '<strong>Para consultas públicas mediante código QR:</strong> Escanee el código QR proporcionado (generado por el sistema). Este lo redireccionará automáticamente a la página de verificación donde podrá consultar sus documentos asignados',
        '<strong>Para búsqueda pública directa:</strong> Acceda a la opción "Verificar/Buscar" en la plataforma, ingrese su número de documento de identidad y visualice todos los trámites y documentos asignados a dicha identidad',
        'Los posibles estados del trámite son:<br>- <strong>Enviado:</strong> El trámite ha sido recibido y registrado en el sistema<br>- <strong>En Revisión:</strong> El trámite se encuentra en revisión por el personal competente<br>- <strong>En Proceso:</strong> Se está realizando el procesamiento de la solicitud<br>- <strong>Finalizado:</strong> El trámite ha sido completado y los resultados están disponibles<br>- <strong>Observado:</strong> El trámite requiere información o documentación adicional',
        'El sistema muestra una barra de progreso indicando el porcentaje de avance del trámite'
      ]
    },
    {
      id: 'documentos',
      title: 'Gestión de Documentos',
      content: 'Los documentos adjuntos en los trámites pueden ser visualizados y descargados en cualquier momento. El sistema proporciona acceso a documentos tanto adjuntados por el usuario como generados durante el procesamiento del trámite.',
      steps: [
        'Acceda a la sección "Mis Trámites"',
        'Seleccione el trámite específico del cual desea ver documentos',
        'Localize la sección "Documentos Adjuntos"',
        'Se mostrará una lista completa de todos los archivos asociados al trámite',
        'Haga clic en el nombre del documento para visualizarlo en línea',
        'Para descargar el documento, haga clic en el botón "Descargar"',
        'El archivo se guardará automáticamente en la carpeta "Descargas" de su dispositivo'
      ]
    },
    {
      id: 'notificaciones',
      title: 'Sistema de Notificaciones',
      content: 'El sistema genera notificaciones automáticas cuando ocurren cambios en el estado de los trámites. Las notificaciones proporcionan información sobre el progreso y acciones requeridas.',
      steps: [
        'Localice el ícono de campana de notificaciones en la esquina superior derecha de la interfaz',
        'Si hay nuevas notificaciones, se mostrará un indicador numérico rojo',
        'Haga clic en la campana para desplegar la lista completa de notificaciones',
        'Las notificaciones incluyen información sobre:<br>- Cambios de estado del trámite<br>- Recepción de documentación<br>- Disponibilidad de resultados<br>- Requerimientos de información adicional',
        'Haga clic en cualquier notificación para navegar directamente al trámite relacionado'
      ]
    },
    {
      id: 'tips',
      title: 'Recomendaciones para Uso Óptimo',
      content: 'Seguir estas recomendaciones mejora la eficiencia en el procesamiento de trámites y reduce la necesidad de correcciones o consultas adicionales.',
      steps: [
        '<strong>Claridad de Información:</strong> Proporcione descripciones claras y precisas en todos los campos de texto',
        '<strong>Documentación Completa:</strong> Adjunte todos los documentos requeridos en el primer envío para evitar retrasos',
        '<strong>Calidad de Documentos:</strong> Escanee o fotografíe documentos con buena iluminación y definición',
        '<strong>Conserve Código de Referencia:</strong> Guarde el código de trámite en un lugar seguro para futuras consultas',
        '<strong>Monitoreo Regular:</strong> Consulte el sistema cada 2-3 días para revisar actualizaciones',
        '<strong>Evite Duplicaciones:</strong> No envíe múltiples copias del mismo trámite',
        '<strong>Tiempos de Procesamiento:</strong> Los trámites requieren entre 1 a 3 días hábiles para procesamiento, dependiendo del tipo'
      ]
    },
    {
      id: 'problemas',
      title: 'Preguntas Frecuentes',
      content: 'Esta sección aborda las consultas más comunes sobre el uso del sistema y los procedimientos institucionales.',
      steps: [
        '<strong>¿Cuál es el tiempo promedio de procesamiento?</strong><br>El tiempo varía entre 1 a 3 días hábiles dependiendo del tipo de trámite y volumen de solicitudes',
        '<strong>¿Puedo editar un trámite después de enviarlo?</strong><br>Sí, es posible editar trámites que se encuentren en estado "Enviado" u "Observado". Una vez en otros estados, no se permite edición',
        '<strong>¿Qué significa el estado "Observado"?</strong><br>Indica que el trámite requiere correcciones o documentación adicional. Revise las observaciones detalladas y realice los cambios necesarios',
        '<strong>¿Dónde recojo los documentos finales?</strong><br>Algunos documentos están disponibles para descarga directa en el sistema. Otros deben ser retirados personalmente en Mesa de Partes. Se especificará en la respuesta del trámite',
        '<strong>¿Es posible crear trámites sin cuenta de usuario?</strong><br>Sí, existe una opción de creación pública de trámites para usuarios sin cuenta de usuario. La creación autenticada para usuarios registrados también está disponible. Ambas opciones cuentan con validaciones de seguridad. Es posible consultar el estado de trámites sin cuenta utilizando el código de referencia',
        '<strong>Horario de Atención - Secretaría General:</strong><br>Lunes a Viernes, 07:30 a 15:00 horas<br>Ubicación: Av. Universitaria s/n, Pampa Grande, Tumbes'
      ]
    }
  ];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  goBack(): void {
    const user = this.authService.currentUserValue;

    if (!user || !user.role) {
      this.router.navigate(['/']);
      return;
    }

    const roleName = user.role.name.toUpperCase();

    switch (roleName) {
      case 'USUARIO':
        this.router.navigate(['/usuario/mis-tramites']);
        break;
      case 'ADMINISTRATIVO':
        this.router.navigate(['/administrativo/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'ESTUDIANTE':
        this.router.navigate(['/estudiante/tablero']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }

}