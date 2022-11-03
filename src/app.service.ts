import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, SchedulerRegistry, Timeout } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class AppService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}
  private readonly logger = new Logger(AppService.name);
  // @Cron('45 * * * * *')
  // handleCron() {
  //   this.logger.debug('Called when the current second is 45');
  // }

  // @Interval(1000 * 10)
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(1000 * 5)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }

  getHello(name: string, time: string): string {
    this.addCronJob(name + '-notification', '*');

    return 'Hello World!';
  }

  addCronJob(name: string, seconds: string) {
    let selectedTime = new Date();
    selectedTime.setMinutes(selectedTime.getMinutes() + 1);
    let currentTime = selectedTime.toISOString().toString().split('.')[0];

    // let date = new Date();
    // // date.setFullYear(2022);
    // // date.setMonth(11);
    // date.setDate(2);
    // date.setHours(2);
    // date.setMinutes(51);

    const job = new CronJob(`${seconds} * * * * *`, () => {
      this.logger.warn(`time (${seconds}) for job ${name} to run!`);
      let time = this.schedulerRegistry.getCronJob(name);
      let cornTime = time.lastDate().toISOString().toString().split('.')[0];
      console.log('\n' + cornTime + ' - ' + currentTime);

      // if (cornTime == currentTime) {
      //   job.stop();
      //   this.deleteCron(name);
      // }

      // job.stop();
      // this.deleteCron(name);

      console.log('\n----------------------- ** ------------------------');
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();

    this.logger.warn(
      `job ${name} added for each minute at ${seconds} seconds!`,
    );
  }

  deleteCron(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
    this.logger.warn(`job ${name} deleted!`);
  }
}
