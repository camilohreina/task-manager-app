package com.uao.taskmanager.TaskManager.domain.task;

import com.uao.taskmanager.TaskManager.entity.State;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDTO {

  private Integer id;
  private String description;
  private State state;
}
