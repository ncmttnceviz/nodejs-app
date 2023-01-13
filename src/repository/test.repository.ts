import {postgres} from "@config/postgres.config";
import Test from "@entity/test.entity";

export const testRepository = postgres.getRepository(Test).extend({
    findByEmail(email: string) {
        return this.findOneBy({email});
    }
})