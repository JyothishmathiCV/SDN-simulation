/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package desmoj.tutorial1.ProcessesExample;

/**
 *
 * @author snssugan37
 */

import java.util.Stack;


public class DFS {

    Stack<Integer> st;
      int vFirst;
      int nexthop=-1;
      int [][] matrix;
      int[][] adjMatrix;
      int[][] spnMatrix;
      int[] parent;
      int[] isVisited = new int[10 ];

    /**
     * @param args
     */
   

    public void DFS(int[][] Matrix,int n) {

         this.matrix = Matrix;
         st = new Stack<Integer>();
         int i;
         this.spnMatrix=new int [n][n];
         this.parent=new int[n];
         int[] node = new int[n];
         for(i=0;i<n;i++) {
        	 node[i]=0;
        	 parent[i]=-1;
        	 for(int j=0;j<n;j++) {
        		 this.spnMatrix[i][j]=0;
        	 }
         }
         int firstNode = node[0];
         dfs(firstNode, n);
         System.out.println("Spanning Tree");
         for(i=0;i<n;i++) {
        	 for(int j=0;j<n;j++) {
        		 System.out.print(this.spnMatrix[i][j]+" ");
        	 }
        	 System.out.println();
         }
//       /////////////////////////////////////////////////////////
         System.out.println("MatrixStart");
         for(int i1=0;i1<spnMatrix.length;i1++) {
       	  System.out.print("Matrix ");
       	  String lin="";
       	  for(int j=0;j<spnMatrix[i1].length;j++) {
       		  lin=lin+spnMatrix[i1][j]+" ";
       	  }
       	  System.out.println(lin);
         }
         System.out.println("MatrixEnd");
//         ///////////////////////////////////////////////////////////                

         for(i=0;i<n;i++) {
        	 isVisited[i]=0;
         }
       //  int next=nextHop(6,4,10); 
        // System.out.println("Next Hop: "+next);
         }

          public void depthFirst(int vFirst,int n)
          {
          int v,i;
          st.push(vFirst);
          while(!st.isEmpty())
          {
              v = st.pop();
              if(isVisited[v]==0)
              {
                  System.out.print("\n"+(v+1));
                  isVisited[v]=1;
              }
              for ( i=0;i<n;i++)
              {
                  if((adjMatrix[v][i] == 1) && (isVisited[i] == 0))
                  {
                      st.push(v);
                      //isVisited[i]=1;
                      //System.out.print(" " + (i+1));
                      //v = i;
                  }
              }
          }
          }
          public void clearVisited()
          {
              for(int i=0;i<isVisited.length;i++)
              {
                  isVisited[i]=0;
              }
          }
          public void dfs(int vFirst,int n) {
        	  if(isVisited[vFirst]==0) {
        		  System.out.println("Node visited : "+(vFirst+1)+" Parent: "+(parent[vFirst]+1));
        		  isVisited[vFirst]=1;
        		  for(int i=0;i<n;i++) {
        			  if((matrix[vFirst][i]==1)&&(isVisited[i]==0)){
        				  if(parent[i]==-1) {
        					  parent[i]=vFirst;
        					  this.spnMatrix[vFirst][i]=this.spnMatrix[i][vFirst]=1;
        				  }
        				  dfs(i, n);
        			  }
        		  }
        	  }
          }
          public int find_nextHop(int src, int dest, int n) {
		for (int i = 0; i < n; i++) {
			isVisited[i] = 0;
		}
		nexthop=-1;
		int next = nextHop(src, dest, n);
		System.out.println("Next Hop: " + next);
		return next;
          }
          public int nextHop(int src,int dest,int n) {
        	  if(isVisited[dest]==0) {
        		  System.out.print((dest+": "));
        		  isVisited[dest]=1;
        		  for(int i=0;i<n;i++) {
        			  if((spnMatrix[dest][i]==1)&&(isVisited[i]==0)){
        				  if(i==src) {
        					  //System.out.println("Dest: "+dest);
        					  nexthop= dest;
        					  return nexthop;
        				  }  
        				  nexthop= nextHop(src,i, n);
        			  }
        		  }
        	  }
        	  return nexthop;
          }

    
}
