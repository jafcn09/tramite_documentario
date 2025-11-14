package com.example.demo.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.CreateRoleRequest;
import com.example.demo.dto.RoleWithCountResponse;
import com.example.demo.dto.UpdateRoleRequest;
import com.example.demo.model.Role;
import com.example.demo.service.RoleService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @GetMapping
    public ResponseEntity<List<RoleWithCountResponse>> getAllRoles() {
        List<RoleWithCountResponse> roles = roleService.getAllRolesWithUserCount();
        return ResponseEntity.ok(roles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Role> getRoleById(@PathVariable("id") Long roleId) {
        return roleService.getRoleById(roleId)
            .map(role -> ResponseEntity.ok(role))
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/name/{name}")
    public ResponseEntity<Role> getRoleByName(@PathVariable("name") String roleName) {
        return roleService.getRoleByName(roleName)
            .map(role -> ResponseEntity.ok(role))
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createRole(@Valid @RequestBody CreateRoleRequest request) {
        try {
            Role role = roleService.createRole(request.getName(), request.getDescription());
            return ResponseEntity.status(HttpStatus.CREATED).body(role);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateRole(@PathVariable Long id, @Valid @RequestBody UpdateRoleRequest request) {
        try {
            Role role = roleService.updateRole(id, request.getName(), request.getDescription());
            return ResponseEntity.ok(role);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(java.util.Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(java.util.Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable Long id) {
        try {
            roleService.deleteRole(id);
            return ResponseEntity.ok(java.util.Map.of("message", "Rol eliminado exitosamente."));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}