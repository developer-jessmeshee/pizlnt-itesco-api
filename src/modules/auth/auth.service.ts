import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(props: LoginDto) {
    const user = await this.validateUser(props);

    console.log(user);

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }

  private async validateUser(props: LoginDto): Promise<any> {
    const { email, password: pass } = props;

    const user = await this.userService.findByEmail(email);

    if (!user) throw new ForbiddenException('Credenciales incorrectas.');

    const isEqualPassword: boolean = await bcrypt.compare(pass, user.password);

    if (!isEqualPassword)
      throw new ForbiddenException('Credenciales incorrectas.');

    const { password, ...result } = user.toObject();

    return result;
  }
}
