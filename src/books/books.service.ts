import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';

import { Book } from './book.model';

@Injectable()
export class BooksService{
    constructor(
        @InjectModel('Book') private readonly bookModel: Model<Book>,
    ){}

    async addBook(title: string, desc: string, author: string, price: number){
        const newBook = new this.bookModel( {
            title, 
            desc, 
            author, 
            price
        });

        const result = await newBook.save();
        return result.id as string;
    }

    async getBooks(){
        const books = await this.bookModel.find().exec();
        return books.map(book => ({
            id: book.id,
            title: book.title,
            desc: book.desc,
            author: book.author,
            price: book.price
            
        }));
    }

    async getOneBook(bookId: string){
        const book = await this.findBook(bookId);

        return {
            id: book.id,
            title: book.title,
            desc: book.desc,
            author: book.author,
            price: book.price
        };;
    }

    async updateBook(bookId: string, title: string, description: string, author: string, price: number){
        const updatedBook = await this.findBook(bookId);

        if(title){
            updatedBook.title = title;
        }
        if(description){
            updatedBook.desc = description;
        }
        if(author){
            updatedBook.author = author;
        }
        if(price){
            updatedBook.price = price;
        }
        updatedBook.save();
        
        
    }

    async deleteBook(id: string){
        const result = await this.bookModel.deleteOne({_id: id }).exec();
        if(result === 0){
            throw new NotFoundException('Could not find a book');

        }
    }


    private async findBook(id: string):Promise<Book>{
        let book;
        try{
            book = await this.bookModel.findById(id).exec();
        }catch(err){
            throw new NotFoundException('Could not find a book');
        }

        if(!book){
            throw new NotFoundException('Could not find a book');
        }
        return book;

    }
}