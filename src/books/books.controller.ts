import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BooksService } from "./books.service";

@Controller('books')
export class BooksController{
    constructor(private readonly booksService: BooksService){}

    @Post()
    addBook(
        @Body('title') bTitle: string,
        @Body('description') bDesc: string,
        @Body('author') bAuthor: string,
        @Body('price') bPrice: number
    ){
        const generateId = this.booksService.addBook(bTitle, bDesc, bAuthor, bPrice);
        return  {id: generateId};
    }

    @Get()
    getAllBooks(){
        return this.booksService.getBooks();
    }

    @Get(':id')
    getOneBook(
        @Param('id') bId: string){
        return this.booksService.getOneBook(bId);
    }

    @Patch(':id')
    updateBook(
        @Param('id') bId: string,
        @Body('title') bTitle: string,
        @Body('description') bDesc: string,
        @Body('author') bAuthor: string,
        @Body('price') bPrice: number
    ){
        this.booksService.updateBook(bId, bTitle, bDesc, bAuthor, bPrice);
        return null;
    }

    @Delete(':id')
    deleteBook(@Param('id') bId: string){
        this.booksService.deleteBook(bId);
        return null;
    }
}