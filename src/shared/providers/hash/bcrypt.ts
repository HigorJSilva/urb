import { IHashProvider } from 'src/shared/interfaces/hash.provider';
import { compare, hash } from 'bcrypt';

class Bcrypt implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    return await hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return await compare(payload, hashed);
  }
}

export default Bcrypt;
