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
      title: '📚 ¿Qué es este sistema?',
      content: 'Es una plataforma digital que te permite realizar tus trámites universitarios de forma rápida y sencilla, sin necesidad de hacer largas colas. Puedes crear solicitudes, hacer seguimiento y recibir respuestas desde tu computadora o celular.',
    },
    {
      id: 'registro',
      title: '🔐 ¿Cómo ingreso al sistema?',
      content: 'Para usar el sistema necesitas una cuenta. solicita tus credenciales en Mesa de Partes.',
      steps: [
        'Haz clic en <strong>"Iniciar Sesión"</strong> en la parte superior de la página',
        'Ingresa tu usuario',
        'Ingresa tu contraseña',
        'Haz clic en <strong>"Ingresar"</strong>',
        'Si es tu primera vez, te pedirán cambiar tu contraseña'
      ]
    },
    {
      id: 'nuevo-tramite',
      title: '📝 ¿Cómo creo un nuevo trámite?',
      content: 'Crear un trámite es muy simple. Solo necesitas completar un formulario y adjuntar los documentos necesarios.',
      steps: [
        'Una vez dentro del sistema, busca el botón <strong>"Nuevo Trámite"</strong> o <strong>"+"</strong>',
        'Selecciona el <strong>tipo de trámite</strong> que necesitas (Certificado, Constancia, Permiso, etc.)',
        'Escribe un <strong>asunto</strong> claro (ejemplo: "Solicitud de Certificado de Estudios")',
        'En <strong>descripción</strong>, explica brevemente qué necesitas',
        'Si tienes documentos, haz clic en <strong>"Adjuntar archivos"</strong> y selecciónalos de tu dispositivo',
        'Revisa que todo esté correcto y haz clic en <strong>"Enviar"</strong>',
        'Anota el <strong>código</strong> que te dan (ejemplo: TRM-2025-0000) para hacer seguimiento'
      ]
    },
    {
      id: 'seguimiento',
      title: '🔍 ¿Cómo consulto el estado de mi trámite?',
      content: 'Puedes ver en qué etapa está tu trámite en cualquier momento, incluso sin iniciar sesión.',
      steps: [
        '<strong>Dentro del sistema:</strong> Ve a "Mis Trámites" y verás todos tus trámites con su estado actual',
        '<strong>Sin iniciar sesión:</strong> Ve a la página de "Búsqueda", ingresa tu código de trámite y haz clic en "Consultar"',
        'Los estados que verás son:<br>- <strong>Enviado:</strong> Tu trámite fue recibido<br>- <strong>En Revisión:</strong> Alguien lo está revisando<br>- <strong>En Proceso:</strong> Se está trabajando en tu solicitud<br>- <strong>Finalizado:</strong> Tu trámite está listo<br>- <strong>Observado:</strong> Necesita correcciones',
        'También verás una <strong>barra de progreso</strong> que muestra qué tan avanzado está'
      ]
    },
    {
      id: 'documentos',
      title: '📄 ¿Cómo veo o descargo documentos?',
      content: 'Cuando tu trámite esté finalizado o necesites ver los documentos que adjuntaste, es muy fácil acceder a ellos.',
      steps: [
        'Entra a <strong>"Mis Trámites"</strong> y haz clic en el trámite que quieres ver',
        'Desplázate hasta la sección <strong>"Documentos Adjuntos"</strong>',
        'Verás una lista de todos los archivos relacionados con tu trámite',
        'Haz clic en cualquier documento para <strong>visualizarlo</strong> en pantalla',
        'Si quieres guardarlo, busca el botón <strong>"Descargar"</strong> en la parte inferior',
        'Los documentos se guardarán en la carpeta de Descargas de tu computadora'
      ]
    },
    {
      id: 'notificaciones',
      title: '🔔 ¿Cómo me entero de los cambios en mi trámite?',
      content: 'El sistema te avisa automáticamente cuando hay novedades en tus trámites.',
      steps: [
        'Verás un ícono de <strong>campanita</strong> en la parte superior derecha',
        'Si hay notificaciones nuevas, aparecerá un <strong>número rojo</strong> con la cantidad',
        'Haz clic en la campanita para ver todas tus notificaciones',
        'Las notificaciones te dirán cosas como:<br>- "Tu trámite fue recibido"<br>- "Tu trámite está en proceso"<br>- "Tu trámite está listo"<br>- "Tu trámite necesita correcciones"',
        'Haz clic en cualquier notificación para ir directamente a ese trámite'
      ]
    },
    {
      id: 'tips',
      title: '💡 Consejos para usar mejor el sistema',
      content: 'Sigue estas recomendaciones para que tus trámites se procesen más rápido.',
      steps: [
        '<strong>Sé claro:</strong> Explica bien qué necesitas en la descripción',
        '<strong>Adjunta lo necesario:</strong> Si te piden documentos, adjúntalos desde el inicio',
        '<strong>Usa buena calidad:</strong> Escanea o fotografía los documentos con buena luz y enfoque',
        '<strong>Guarda el código:</strong> Anota el código de tu trámite en un lugar seguro',
        '<strong>Revisa notificaciones:</strong> Entra al sistema cada 2-3 días para ver actualizaciones',
        '<strong>No crees duplicados:</strong> Si ya enviaste un trámite, no lo vuelvas a enviar',
        '<strong>Paciencia:</strong> Los trámites pueden tomar algunos días en procesarse'
      ]
    },
    {
      id: 'problemas',
      title: '❓ Preguntas Frecuentes',
      content: 'Aquí encontrarás respuestas a las dudas más comunes.',
      steps: [
        '<strong>¿Olvidé mi contraseña?</strong><br>Ve a Secretaria General con tu DNI para recuperarla',
        '<strong>¿Cuánto tiempo demora un trámite?</strong><br>Normalmente entre 1 a 3 días hábiles, dependiendo del tipo',
        '<strong>¿Puedo editar mi trámite después de enviarlo?</strong><br>Sí, pero solo si está en estado "Enviado" u "Observado"',
        '<strong>¿Por qué mi trámite está "Observado"?</strong><br>Significa que falta información o documentos. Revisa las observaciones y corrígelo',
        '<strong>¿Dónde recojo mi documento final?</strong><br>Algunos documentos los descargas del sistema, otros en Mesa de Partes. Te lo indicarán en la respuesta',
        '<strong>¿Puedo hacer trámites sin cuenta?</strong><br>No, necesitas una cuenta para crear trámites. Pero puedes consultar el estado sin cuenta',
        '<strong>Horario de Secretaria General:</strong><br>Lunes a Viernes de 7:30 AM a 3:00 PM<br>Av. Universitaria s/n, Pampa Grande, Tumbes'
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