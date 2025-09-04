
package com.example.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.dto.RoleWithCountResponse;
import com.example.demo.model.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    
    Optional<Role> findByName(String name);
    
    boolean existsByName(String name);
    
    @Query("SELECT new com.example.demo.dto.RoleWithCountResponse(" +
           "r.id, r.name, r.description, " +
           "(SELECT COUNT(u.id) FROM Usuario u WHERE u.role.id = r.id), " +
           "null, null) " +
           "FROM Role r")
    List<RoleWithCountResponse> findAllRolesWithUserCount();
}