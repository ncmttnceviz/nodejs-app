import {testRepository} from "@repository/test.repository";
import Test from "@entity/test.entity";

export class TestService {
    async findUserByEmail(email: string): Promise<Test | null> {
        return await testRepository.findByEmail(email)
    }
}

export const testService = new TestService();