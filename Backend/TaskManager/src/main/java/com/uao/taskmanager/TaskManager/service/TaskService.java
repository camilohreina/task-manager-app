package com.uao.taskmanager.TaskManager.service;

import com.uao.taskmanager.TaskManager.domain.task.TaskDTO;
import com.uao.taskmanager.TaskManager.mapper.TaskMapper;
import com.uao.taskmanager.TaskManager.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

  @Autowired
  private AuthenticationService authenticationService;

  @Autowired
  private TaskMapper taskMapper;

  @Autowired
  private TaskRepository taskRepository;

  public List<TaskDTO> findTasksByUser() {

    var user = authenticationService.getCurrentuser();

    return taskRepository.findByUser(user).stream().map(taskMapper::buildDTO).toList();


  }
}
