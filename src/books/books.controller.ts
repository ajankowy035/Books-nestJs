import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController{
    constructor(private readonly booksService: BooksService){}

    @Post()
    async addBook(
        @Body('title') bTitle: string,
        @Body('description') bDesc: string,
        @Body('author') bAuthor: string,
        @Body('price') bPrice: number
        ){
        const book = await this.booksService.create(
            bTitle,
            bDesc,
            bAuthor,
            bPrice
        );
        return  {
            statusCode: HttpStatus.OK,
            message: 'Book added!',
            data: book
        };
    }

    @Get()
    async getAllBooks(){
        const products = await this.booksService.findAll();
        return products;
    }

    @Get(':id')
    async getOneBook(
        @Param('id') bId: string){
        return await this.booksService.getOneBook(bId);
    }

    @Patch(':id')
    async updateBook(
        @Param('id') bId: string,
        @Body('title') bTitle: string,
        @Body('description') bDesc: string,
        @Body('author') bAuthor: string,
        @Body('price') bPrice: number
    ){
        await this.booksService.updateBook(bId, bTitle, bDesc, bAuthor, bPrice);
        return null;
    }

    @Delete(':id')
    async deleteBook(@Param('id') bId: string){
        await this.booksService.deleteBook(bId);
        return null;
    }
}