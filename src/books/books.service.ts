import { Injectable, NotFoundException } from "@nestjs/common";
import { Book } from './book.model';

@Injectable()
export class BooksService{
    private books: Book[];

    addBook(title: string, desc: string, author: string, price: number){
        const bookId = Math.random().toString();
        const newBook = new Book(bookId, title, desc, author, price);

        return bookId;
    }

    getBooks(){
        return [...this.books];
    }

    getOneBook(bookId: string){
        const book = this.findBook(bookId)[0];

        return {...book};
    }

    updateBook(bookId: string, title: string, description: string, author: string, price: number){
        const [ book, index ] = this.findBook(bookId);
        const updatedBook = {...book};

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

        this.books[index] = updatedBook;
        
    }

    deleteBook(id: string){
        const [ _, index] = this.findBook(id);
        const updatedBooks = this.books.filter(book => book.id!== id);
        return [...updatedBooks];
    }


    private findBook(id: string):[Book, number]{
        const bookIndex = this.books.findIndex(book=> book.id === id);
        const book = this.books[bookIndex];
        if(!book){
            throw new NotFoundException('There is no book with that id');
        }

        return [book, bookIndex]

    }
}