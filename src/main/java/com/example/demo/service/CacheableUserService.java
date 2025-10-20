package com.example.demo.service;

import com.example.demo.model.Usuario;
import com.example.demo.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.CachePut;
import org.springframework.stereotype.Service;

import java.util.Optional;

/**
 * Servicio con cache para operaciones de usuario
 * Autor: Jhafet Cánepa
 * Universidad Nacional de Tumbes
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CacheableUserService {

    private final UsuarioRepository usuarioRepository;

    /**
     * Buscar usuario por ID con cache
     * El resultado se almacena en cache por 30 minutos
     */
    @Cacheable(value = "usuarios", key = "#id")
    public Optional<Usuario> findUserById(Long id) {
        log.debug("Buscando usuario por ID desde base de datos: {}", id);
        return usuarioRepository.findById(id);
    }

    /**
     * Buscar usuario por email con cache
     */
    @Cacheable(value = "usuarios", key = "'email:' + #email")
    public Optional<Usuario> findUserByEmail(String email) {
        log.debug("Buscando usuario por email desde base de datos: {}", email);
        return usuarioRepository.findByCorreo(email);
    }

    /**
     * Buscar usuario por username con cache
     */
    @Cacheable(value = "usuarios", key = "'username:' + #username")
    public Optional<Usuario> findUserByUsername(String username) {
        log.debug("Buscando usuario por username desde base de datos: {}", username);
        return usuarioRepository.findByUsuario(username);
    }

    /**
     * Actualizar usuario y actualizar cache
     */
    @CachePut(value = "usuarios", key = "#usuario.id")
    public Usuario updateUser(Usuario usuario) {
        log.debug("Actualizando usuario en base de datos: {}", usuario.getId());
        Usuario savedUser = usuarioRepository.save(usuario);

        // También invalidar las entradas por email y username si cambiaron
        evictUserCacheByEmail(savedUser.getCorreo());
        evictUserCacheByUsername(savedUser.getUsuario());

        return savedUser;
    }

    /**
     * Eliminar usuario del cache por ID
     */
    @CacheEvict(value = "usuarios", key = "#id")
    public void evictUserCache(Long id) {
        log.debug("Eliminando usuario del cache: {}", id);
    }

    /**
     * Eliminar usuario del cache por email
     */
    @CacheEvict(value = "usuarios", key = "'email:' + #email")
    public void evictUserCacheByEmail(String email) {
        log.debug("Eliminando usuario del cache por email: {}", email);
    }

    /**
     * Eliminar usuario del cache por username
     */
    @CacheEvict(value = "usuarios", key = "'username:' + #username")
    public void evictUserCacheByUsername(String username) {
        log.debug("Eliminando usuario del cache por username: {}", username);
    }

    /**
     * Limpiar todo el cache de usuarios
     */
    @CacheEvict(value = "usuarios", allEntries = true)
    public void clearAllUserCache() {
        log.info("Limpiando todo el cache de usuarios");
    }
}