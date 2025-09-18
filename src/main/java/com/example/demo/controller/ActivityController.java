package com.example.demo.controller;

import com.example.demo.dto.ActivityResponse;
import com.example.demo.service.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    // Public endpoint for demo/testing
    @GetMapping("/public/recent")
    public ResponseEntity<List<ActivityResponse>> getRecentActivitiesPublic(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset) {
        // Return empty list for public access
        return ResponseEntity.ok(List.of());
    }

    @GetMapping("/recent")
    @PreAuthorize("hasRole('ADMIN') or hasRole('ADMINISTRATIVO')")
    public ResponseEntity<List<ActivityResponse>> getRecentActivities(
            @RequestParam(name = "limit", defaultValue = "5") int limit,
            @RequestParam(name = "offset", defaultValue = "0") int offset) {
        List<ActivityResponse> activities = activityService.getRecentActivities(limit, offset);
        return ResponseEntity.ok(activities);
    }
}