import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'master@admin.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'admin1234', minLength: 8 })
  @IsString()
  @MinLength(8)
  password!: string;
}
