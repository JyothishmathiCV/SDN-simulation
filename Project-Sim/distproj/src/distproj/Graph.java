package distproj;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import java.util.ArrayList;
import java.util.List;
import java.util.Stack;
/**
 *
 * @author staff
 */
class MyGraph
{
    int id;
    public MyGraph(int id)
    { 
       this.id=id; 
    }
    public int getID()
    {
        return id;
    }
}

public class Graph {
  
      
    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        MyGraph A,B,C,D,E;
        int[][] G = {  { 0, 1, 1, 0, 0},  
			{ 1, 0, 1, 1, 1},  
			{ 1, 1, 0, 1, 1}, 
                        { 0, 1, 1, 0, 1},
                        { 0, 1, 1, 1, 0},
      };
        ArrayList<MyGraph> list=new ArrayList();
        A=new MyGraph(0);
        B=new MyGraph(1);
        C=new MyGraph(2);
        D=new MyGraph(3);
        E=new MyGraph(4);
        System.out.println(A.getID());
        System.out.println(B.getID());
        System.out.println(C.getID());
        System.out.println(D.getID());
        System.out.println(E.getID());
        list.add(A);
        list.add(B);
        list.add(C);
        list.add(D);
        list.add(E);
        System.out.println(list.indexOf(A));
        System.out.println(list.indexOf(B));
        System.out.println(list.indexOf(C));
        System.out.println(list.indexOf(D));
        System.out.println(list.indexOf(E));
            
        // TODO code application logic here
    
    }
    
}
