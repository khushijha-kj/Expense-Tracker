import { query } from 'express';
import {Expense} from '../models/expense.model.js';
export const addExpense = async (req,res) => {
    try{
        const {description, amount, category} = req.body;
        const userId = req.id;
        if(!description || !amount || !category) {
            return res.status(400).json({message: "Please fill in all fields.",success: false})
        };
        const expense = await Expense.create({ 
            description,
            amount,
            category,
            userId
        });
        return res.status(201).json({message: "Expense added successfully",success: true,expense});

    }
    catch(error){
        console.log(error);
    }
}

export const getAllExpenses = async (req,res) => {
    try{
        const userId = req.id;
        let category = req.query.category || "";
        const done = req.query.category || "";

        const query = {
            userId
        }

        if(category.toLowerCase() === "all"){
            //no need to filter by category

        }else{
            query.category = {$regex:category,$options:'i'}
        }
        if(done.toLowerCase() === "done"){
            query.done = true;

        }
        else if(done.toLowerCase() === "undone"){
            query.done = false;
            
        };
        const  expense = await Expense.find(query);
        if(!expense || expense.length === 0){
            return res.status(404).json({message:"No expense found",success:false})
        };
        return res.status(200).json({
            message,
            success:true,
        })
    }
    catch(error){
        console.log(error);

    }
}

export const markAsDoneOrUndone = async(req,res) => {
    try{
        const expenseId = req.params.id;
        const done = req.body;
        const expense = await Expense.findByIdAndUpdate(expenseId,done,{new:true});
        if(!expense){
            return res.status(404).json({
                message : "Expense not found",
                success:false
            })
        };
        return res.status(200).json({
                message:`Expense marked as ${expense.done ? 'done' : 'undone'}.`,
                success:true
            }
        )


    }
    catch(error){
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
}

export const removeExpense = async(req,res) => {
    try{
        const expenseId = req.params.id;
        await Expense.findByIdAndDelete(expenseId);
        return res.status(200).json({message:"Expense removed successfully",success:true});

    }
    catch(error){
        console.log(error);
    }    
}

export const updateExpense = async(req,res) => {
    try{
        const {description, amount, category} = req.body;
        const expenseId = req.params.id;
        const updateData = {
            description,
            amount,
            category
        };
        const expense = await Expense.findByIdAndUpdate(expenseId,updateData,{new:true});

        return res.status(200).json({message:"Expense updated successfully",success:true,expense});
    }

    catch(error){
        console.log(error);
    }
}