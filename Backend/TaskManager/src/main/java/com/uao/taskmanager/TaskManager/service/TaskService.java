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
  public TaskDTO createTask(TaskDTO taskDTO) {
    var user = authenticationService.getCurrentuser();
    if(taskDTO.getDescription().isEmpty()) {
      throw new IllegalArgumentException("Incorrect parameters");
    }
    var task = taskMapper.buildEntity(taskDTO);
    task.setUser(user);
    taskRepository.save(task);
    return taskMapper.buildDTO(task);

  }
}
