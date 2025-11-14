package com.example.demo.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class RoleDescriptionService {

    /**
     * Get role-specific functionalities and permissions description
     * @param roleName The role name (ADMIN, ADMINISTRATIVO, USUARIO, ESTUDIANTE)
     * @return Map containing role details and functionalities
     */
    public Map<String, Object> getRoleFunctionalities(String roleName) {
        return switch (roleName.toUpperCase()) {
            case "ADMIN" -> getAdminFunctionalities();
            case "ADMINISTRATIVO" -> getAdministrativoFunctionalities();
            case "USUARIO" -> getUsuarioFunctionalities();
            case "ESTUDIANTE" -> getEstudianteFunctionalities();
            default -> getDefaultFunctionalities();
        };
    }

    private Map<String, Object> getAdminFunctionalities() {
        Map<String, Object> admin = new HashMap<>();
        admin.put("roleName", "administrador");
        admin.put("roleIcon", "👨‍💼");
        admin.put("description", "Acceso completo a todas las funcionalidades del sistema");
        admin.put("functionalities", List.of(
            "📊 Gestión integral del sistema",
            "👥 Crear, editar y eliminar usuarios",
            "🔐 Gestionar roles y permisos",
            "📁 Administrar áreas y departamentos",
            "📋 Ver todos los trámites del sistema",
            "✅ Aprobar, rechazar y derivar trámites",
            "💬 Responder trámites con documentos adjuntos",
            "📈 Acceder a reportes y estadísticas avanzadas",
            "🔒 Gestionar seguridad y auditoría",
            "⚙️ Configurar parámetros del sistema",
            "🔄 Restablecer contraseñas de usuarios",
            "📧 Habilitar/Deshabilitar cuentas de usuario",
            "🎯 Asignar trámites a administrativos",
            "📊 Monitorear actividad del sistema"
        ));
        admin.put("accessLevel", "FULL_SYSTEM_ACCESS");
        admin.put("permissions", List.of(
            "CREATE", "READ", "UPDATE", "DELETE",
            "MANAGE_USERS", "MANAGE_ROLES", "VIEW_ALL_TRAMITES",
            "APPROVE", "REJECT", "DERIVE", "RESPOND",
            "VIEW_REPORTS", "MANAGE_SECURITY", "CONFIGURE_SYSTEM"
        ));
        return admin;
    }

    private Map<String, Object> getAdministrativoFunctionalities() {
        Map<String, Object> administrativo = new HashMap<>();
        administrativo.put("roleName", "administrativo");
        administrativo.put("roleIcon", "👨‍💻");
        administrativo.put("description", "Acceso a operaciones administrativas y gestión de trámites asignados");
        administrativo.put("functionalities", List.of(
            "📁 Ver trámites asignados a tu área",
            "✅ Aprobar y rechazar trámites",
            "🔄 Derivar trámites a otros administrativos",
            "💬 Responder trámites con documentos adjuntos",
            "👥 Ver usuarios de tu área",
            "📊 Acceder a reportes de tu área",
            "📈 Ver estadísticas de trámites procesados",
            "🔍 Buscar y filtrar trámites",
            "📋 Descargar reportes de trámites",
            "📝 Agregar comentarios en trámites",
            "🏠 Ver panel de control personalizado"
        ));
        administrativo.put("accessLevel", "AREA_MANAGEMENT");
        administrativo.put("permissions", List.of(
            "CREATE", "READ", "UPDATE",
            "VIEW_ASSIGNED_TRAMITES", "APPROVE", "REJECT", "DERIVE", "RESPOND",
            "VIEW_AREA_USERS", "VIEW_AREA_REPORTS"
        ));
        return administrativo;
    }

    private Map<String, Object> getUsuarioFunctionalities() {
        Map<String, Object> usuario = new HashMap<>();
        usuario.put("roleName", "usuario");
        usuario.put("roleIcon", "👤");
        usuario.put("description", "Acceso para crear y gestionar trámites personales");
        usuario.put("functionalities", List.of(
            "📝 Crear nuevos trámites",
            "📋 Ver mis trámites",
            "🔍 Buscar mis trámites",
            "📊 Ver estado y progreso de mis trámites",
            "💬 Ver respuestas de administrativos",
            "📎 Descargar documentos adjuntos",
            "✏️ Editar borradores de trámites",
            "📧 Recibir notificaciones por correo",
            "👤 Ver perfil personal",
            "🔐 Cambiar contraseña",
            "📱 Acceder desde dispositivos móviles"
        ));
        usuario.put("accessLevel", "LIMITED_SELF_SERVICE");
        usuario.put("permissions", List.of(
            "CREATE", "READ", "VIEW_OWN_TRAMITES",
            "EDIT_OWN_DRAFTS", "DOWNLOAD_DOCUMENTS",
            "VIEW_NOTIFICATIONS"
        ));
        return usuario;
    }

    private Map<String, Object> getEstudianteFunctionalities() {
        Map<String, Object> estudiante = new HashMap<>();
        estudiante.put("roleName", "estudiante");
        estudiante.put("roleIcon", "🎓");
        estudiante.put("description", "Acceso limitado para solicitudes académicas");
        estudiante.put("functionalities", List.of(
            "📝 Crear solicitudes académicas",
            "📋 Ver mis solicitudes",
            "🔍 Buscar mis solicitudes",
            "📊 Ver estado de mis solicitudes",
            "💬 Ver respuestas de administrativos",
            "📎 Descargar documentos de respuesta",
            "📧 Recibir notificaciones por correo",
            "👤 Ver perfil de estudiante",
            "🔐 Cambiar contraseña",
            "⚠️ Acceso restringido al módulo de estudiantes"
        ));
        estudiante.put("accessLevel", "STUDENT_LIMITED");
        estudiante.put("permissions", List.of(
            "CREATE", "READ", "VIEW_OWN_SOLICITUDES",
            "DOWNLOAD_DOCUMENTS", "VIEW_NOTIFICATIONS"
        ));
        return estudiante;
    }

    private Map<String, Object> getDefaultFunctionalities() {
        Map<String, Object> default_ = new HashMap<>();
        default_.put("roleName", "Usuario");
        default_.put("roleIcon", "👤");
        default_.put("description", "Acceso básico al sistema");
        default_.put("functionalities", List.of(
            "📋 Ver información personal",
            "👤 Actualizar perfil",
            "🔐 Cambiar contraseña"
        ));
        default_.put("accessLevel", "BASIC");
        default_.put("permissions", List.of("READ"));
        return default_;
    }

    /**
     * Get HTML formatted functionalities list
     * @param roleName The role name
     * @return HTML list of functionalities
     */
    public String getFunctionalitiesHtml(String roleName) {
        Map<String, Object> functionalities = getRoleFunctionalities(roleName);
        @SuppressWarnings("unchecked")
        List<String> features = (List<String>) functionalities.get("functionalities");

        StringBuilder html = new StringBuilder();
        html.append("<ul style=\"list-style: none; padding: 0; margin: 10px 0;\">");
        for (String feature : features) {
            html.append("<li style=\"padding: 8px 0; color: #4a5568; font-size: 15px;\">")
                .append(feature)
                .append("</li>");
        }
        html.append("</ul>");
        return html.toString();
    }

    /**
     * Get a brief summary of role permissions
     * @param roleName The role name
     * @return String summary of what the role can do
     */
    public String getRoleSummary(String roleName) {
        Map<String, Object> functionalities = getRoleFunctionalities(roleName);
        return (String) functionalities.get("description");
    }
}