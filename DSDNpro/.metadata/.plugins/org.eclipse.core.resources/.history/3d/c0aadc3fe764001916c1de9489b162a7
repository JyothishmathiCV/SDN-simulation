 package desmoj.tutorial1.ProcessesExample;

import desmoj.core.simulator.*;
import co.paralleluniverse.fibers.SuspendExecution;
import java.util.Stack;
//import desmoj.tutorial1.ProcessesExample.DFS; 
 
public class OpenFlowController extends SimProcess {
   
  
	private ProcessesExample myModel;
        int insrc,indes;
	
	public OpenFlowController(Model owner, String name, boolean showInTrace) {

		super(owner, name, showInTrace);
		// store a reference to the model this VC is associated with
		myModel = (ProcessesExample)owner;
	}
	
	public void lifeCycle() throws SuspendExecution {

		  DFS df=new DFS();
                  int[][] adjMatrix = {  { 0, 1, 1, 0, 0, 0, 0, 0, 0, 0},  // 0
    		  			     { 1, 0, 1, 1, 1, 0, 0, 0, 0, 0},  // 1
			                 { 1, 1, 0, 1, 1, 0, 0, 0, 0, 0}, 
                             { 0, 1, 1, 0, 1, 1, 0, 0, 0, 0},
                             { 0, 1, 1, 1, 0, 1, 1, 0, 0, 0},// 2
                             { 0, 0, 0, 1, 1, 0, 1, 1, 0, 0},
                             { 0, 0, 0, 0, 1, 1, 0, 0, 1, 0},
                             { 0, 0, 0, 0, 0, 1, 0, 0, 0, 1},
                             { 0, 0, 0, 0, 0, 0, 1, 0, 0, 1},
                             { 0, 0, 0, 0, 0, 0, 0, 1, 1, 0},
                          };
                  for(int i=0;i<myModel.NodeList.size();i++)
                  {
                      System.out.println(myModel.NodeList.get(i).name);
                      
                  }
                  df.DFS(adjMatrix,10);
                                while(true) 
                                {
                                /*    int[][] adjMatrix = {  { 0, 1, 1, 0, 0, 0, 0, 0, 0, 0},  // 0
    		  			     { 1, 0, 1, 1, 1, 0, 0, 0, 0, 0},  // 1
			                 { 1, 1, 0, 1, 1, 0, 0, 0, 0, 0}, 
                             { 0, 1, 1, 0, 1, 1, 0, 0, 0, 0},
                             { 0, 1, 1, 1, 0, 1, 1, 0, 0, 0},// 2
                             { 0, 0, 0, 1, 1, 0, 1, 1, 0, 0},
                             { 0, 0, 0, 0, 1, 1, 0, 0, 1, 0},
                             { 0, 0, 0, 0, 0, 1, 0, 0, 0, 1},
                             { 0, 0, 0, 0, 0, 0, 1, 0, 0, 1},
                             { 0, 0, 0, 0, 0, 0, 0, 1, 1, 0},
                          }; */
                                    
                                  //df.DFS(adjMatrix,10);
                                 //System.out.println("OpenFlow Controller");
				// YES, there is a customer (packet) waiting
 
				// get a reference to the first packet from the controller queue
  				// (the type cast is necessary because the queue returns SimProcess
				// objects instead of packet objects)
                                if(!myModel.controllerQueue.isEmpty())
                                {
				Packet nextPacket = myModel.controllerQueue.first();
				// remove the packet from the queue
				myModel.controllerQueue.remove(nextPacket);
                               System.out.println(nextPacket.getName());
                               nextPacket.setFlow();
                               df.clearVisited();
                               insrc=myModel.NodeList.indexOf(nextPacket.myclient);
                               indes=myModel.NodeList.indexOf(nextPacket.mydest);
                              System.out.println("Source "+insrc+" ");
                              System.out.println("Destination "+indes+" ");
                                  int next = df.nextHop(insrc,indes,10);
                               // int next=df.nextHop(myModel.NodeList.indexOf(nextPacket.mydest),myModel.NodeList.indexOf(nextPacket.myclient),10);
                                System.out.println("Next Hop: "+next);
                                 myModel.getTimeStamp();
                                System.out.println(nextPacket.getName()+" processed by SDN Controller");
                                nextPacket.nexthop= myModel.NodeList.get(next);
                             //  nextPacket.getFlow();
                                
                             /*   if(nextPacket.myclient.name.equals("A"))
                                { //  nextPacket.myclient.equals(myModel.A)
                                    nextPacket.mydest=myModel.B;                                  
                                }
                                if(nextPacket.myclient.name.equals("B"))
                                {
                                    nextPacket.mydest=myModel.A;
                                }*/
				hold(new TimeSpan(myModel.getOpenFlowServiceTime()));
                                nextPacket.myclient.flowQueue.insert(nextPacket);
                                nextPacket.myclient.packetQueue.insert(nextPacket);
				
                                }
                                else
                                {
                                     hold(new TimeSpan(0.01));
                                }
                                }
                                
        }
       
	 
} /* end of process class */

