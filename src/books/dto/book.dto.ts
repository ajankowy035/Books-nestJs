import { Allow } from "class-validator";

export class CreateBookDto {
    @Allow()
    title: string;

    @Allow()
    desc: string;

    @Allow()
    author:string;

    @Allow()
    price: number;
}