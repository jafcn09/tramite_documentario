package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.RoleWithCountResponse;
import com.example.demo.model.Role;
import com.example.demo.repository.RoleRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService {
    
    private final RoleRepository roleRepository;
    
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    
    public List<RoleWithCountResponse> getAllRolesWithUserCount() {
        return roleRepository.findAllRolesWithUserCount();
    }
    
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }
    
    public Optional<Role> getRoleByName(String name) {
        return roleRepository.findByName(name);
    }
    
    public Role createRole(String name, String description) {
        if (roleRepository.existsByName(name)) {
            throw new IllegalArgumentException("Role with name " + name + " already exists.");
        }
        
        Role role = new Role();
        role.setName(name);
        role.setDescription(description);
        
        return roleRepository.save(role);
    }
    
    public Role updateRole(Long id, String name, String description) {
        Role role = roleRepository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("Role con este id" + id + " no funciona."));

        if (name != null && !name.equals(role.getName())) {
            if (roleRepository.existsByName(name)) {
                throw new IllegalArgumentException("Rol con este nombre " + name + " existe.");
            }
            role.setName(name);
        }
        
        // Update description if provided
        if (description != null) {
            role.setDescription(description);
        }
        
        return roleRepository.save(role);
    }
    
    public void deleteRole(Long id) {
        if (!roleRepository.existsById(id)) {
            throw new EntityNotFoundException("Rol con este id  " + id + " no funciona.");
        }
        roleRepository.deleteById(id);
    }
    
    public boolean existsByName(String name) {
        return roleRepository.existsByName(name);
    }
}