import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiConsumes,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
  Headers,
  Req,
} from '@nestjs/common';
import {
  CreateTaskDto,
  UpdateTaskDto,
  TaskRdo,
  parseQueryFromUrl,
  ChangeTaskStatusDto,
  TaskImage,
} from '@taskforce/core';
import { TaskService } from './task.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from '@nestjs/common';

@ApiTags('tasks')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('task')
  @ApiOperation({ summary: 'Creates new task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiCreatedResponse({
    type: TaskRdo,
    description: 'Task was successfully created',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async create(
    @Body() dto: CreateTaskDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.taskService.createTask(dto, authHeader);
  }

  @Get('task/:id')
  @ApiOperation({ summary: 'Gets task details by id' })
  @ApiOkResponse({
    type: TaskRdo,
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  async show(@Param('id') taskId: string) {
    return this.taskService.getTask(taskId);
  }

  @Patch('task/:id')
  @ApiOperation({ summary: 'Updates task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    description: 'Task successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async update(
    @Param('id') taskId: string,
    @Body() dto: UpdateTaskDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.taskService.updateTask(taskId, dto, authHeader);
  }

  @Delete('task/:id')
  @ApiOperation({ summary: 'Deletes task' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiNoContentResponse({
    description: 'Task successfully deleted',
  })
  @ApiNotFoundResponse({
    description: 'Task with give id not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async deleteTask(
    @Param('id') taskId: string,
    @Headers('authorization') authHeader: string
  ) {
    return this.taskService.deleteTask(taskId, authHeader);
  }

  @Get('new')
  @ApiOperation({ summary: 'gets new tasks' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async showNew(
    @Req() req: Request,
    @Headers('authorization') authHeader: string
  ) {
    const query = parseQueryFromUrl(req.url);
    return this.taskService.findNew(query, authHeader);
  }

  @Get('personal')
  @ApiOperation({ summary: 'gets personal tasks' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    isArray: true,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async showPersonal(
    @Req() req: Request,
    @Headers('authorization') authHeader: string
  ) {
    const query = parseQueryFromUrl(req.url);
    return this.taskService.findPersonal(query, authHeader);
  }

  @Post('task/:id/image')
  @ApiOperation({ summary: 'Uploads task image' })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiConsumes('multipart/form-data')
  @ApiOkResponse({
    type: TaskRdo,
    description: 'Task image was sussessfully uploaded',
  })
  @ApiNotFoundResponse({
    description: 'Task not found',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  @ApiBadRequestResponse({
    description: 'Bad request',
  })
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') taskId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: TaskImage.MaxSize }),
          new FileTypeValidator({ fileType: TaskImage.FileType }),
        ],
      })
    )
    file: Express.Multer.File,
    @Headers('authorization') authHeader: string
  ) {
    return this.taskService.setImage(taskId, file, authHeader);
  }

  @Patch('task/:id/status')
  @ApiOperation({
    summary: `Updates task status by sending corresponding commands: start, cance, fail, finish`,
  })
  @ApiHeader({
    name: 'Authorization',
    description: 'Bearer token',
  })
  @ApiOkResponse({
    type: TaskRdo,
    description: 'Task status was successfully updated',
  })
  @ApiNotFoundResponse({
    description: 'Task with give id not found',
  })
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  async changeTaskStatus(
    @Param('id') taskId: string,
    @Body() dto: ChangeTaskStatusDto,
    @Headers('authorization') authHeader: string
  ) {
    return this.taskService.changeTaskStatus(taskId, dto, authHeader);
  }
}
