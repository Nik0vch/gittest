import { Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService:EmailService)
    {}

    @Get()
    sendOnEmail(){
        this.emailService.sendOnEmail("nik.ovch16@gmail.com", "Проверка", "Проверка");
    }
}
