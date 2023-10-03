package com.uao.taskmanager.TaskManager.controller;

import com.uao.taskmanager.TaskManager.domain.authentication.JwtAuthenticationRS;
import com.uao.taskmanager.TaskManager.domain.authentication.SigninRQ;
import com.uao.taskmanager.TaskManager.domain.authentication.SignupRQ;
import com.uao.taskmanager.TaskManager.domain.task.TaskDTO;
import com.uao.taskmanager.TaskManager.service.AuthenticationService;
import com.uao.taskmanager.TaskManager.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("v1/task")
public class TaskController {

  @Autowired
  private TaskService taskService;

  @GetMapping
  public ResponseEntity<List<TaskDTO>> findTasksByUser() {
    return ResponseEntity.ok(taskService.findTasksByUser());
  }

}
