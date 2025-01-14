import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { UpdateJobDto } from './dto/update-job.dto';
import { find } from 'rxjs';
import { FindJobDto } from './dto/find-job.dto';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobsService: JobsService) { }

  @Post('find')
  create(@Body() FindJobDto: FindJobDto) {
    return this.jobsService.findAll(FindJobDto);
  }

  // @Get()
  // findAll() {
  //   return this.jobsService.findAll();
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jobsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobsService.update(+id, updateJobDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jobsService.remove(+id);
  }
}
