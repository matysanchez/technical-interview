import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from './entities/job.entity'
import { FindJobDto } from './dto/find-job.dto';

@Injectable()
export class JobsService {



  constructor(
    @InjectModel('Jobs') private JobModel: Model<Job>
  ) { }

  create(createJobDto: CreateJobDto) {
    // return this.JobModel.find();
  }

  async findAll(findJob: FindJobDto) {

    // should show only 10 jobs at a time
    // should default the sort to most recent job posting
    // should only show jobs that are active

    const page = findJob.page ?? 0 // if no page is provided, default to 0    
    let list = []

    const findWithParameters = { expiredAt: null } // just find not expired jobs
    const resultsPerPage = 10; // 10 results per page

    // find using text
    if (findJob.text && findJob.text.length > 2) {
      // find using or
      findWithParameters['$or'] = [
        { title_name: { $regex: findJob.text, $options: 'i' } },  // $regex realiza una búsqueda con expresiones regulares
        { title_name_raw: { $regex: findJob.text, $options: 'i' } },
        { body: { $regex: findJob.text, $options: 'i' } },
        { company_name: { $regex: findJob.text, $options: 'i' } }
      ]
    }

    // find using location

    if (findJob.latitude && findJob.longitude && findJob.distance) {
      // find using near
      const latlong = [findJob.longitude, findJob.latitude];
      console.log(latlong)

      findWithParameters['location.coordinates'] = {
        $near: {
          $maxDistance: findJob.distance,
          $geometry: {
            type: 'Point',
            coordinates: latlong,
          },
        },
      }
      //  $near actually sorts the results by distance by default so we have to remove sort by most recent
      list = await this.JobModel.find(findWithParameters).limit(10).skip(resultsPerPage * page)
    }
    else
      list = await this.JobModel.find(findWithParameters).sort({ createdAt: -1 }).limit(10).skip(resultsPerPage * page)


    const result = { list, count: await this.JobModel.find(findWithParameters).count() }
    return result
  }


  findOne(id: number) {
    return `This action returns a #${id} job`;
  }

  update(id: number, updateJobDto: UpdateJobDto) {
    return `This action updates a #${id} job`;
  }

  remove(id: number) {
    return `This action removes a #${id} job`;
  }
}
