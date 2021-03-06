 package distproj; 

import desmoj.core.simulator.*;
import co.paralleluniverse.fibers.SuspendExecution;

/**
 * This class represents a process source, which continually generates
 * packets in order to keep the simulation running.
 *
 * It will create a new packet, activate it (so that it arrives at
 * the terminal) and then wait until the next packet arrival is
 * due.
 * @author Ruth Meyer
 */
public class PacketGenerator extends SimProcess {

	/**
	 * PacketGenerator constructor comment.
	 * @param owner the model this packet generator belongs to
	 * @param name this packet generator's name
	 * @param showInTrace flag to indicate if this process shall produce output for the trace
	 */
        int rand, UB;
        Client myclient;
        
	public PacketGenerator(Model owner,Client client,String name, boolean showInTrace) {
		super(owner, name, showInTrace);
                myclient = (Client)client;
                UB=6;
            //    System.out.println("const "+myclient.name);
	}
	/**
	 * describes this process's life cycle: continually generate new packets.
	 */
	public void lifeCycle() throws SuspendExecution {

		// get a reference to the model
		ProcessesExample model = (ProcessesExample)getModel();
                
		// endless loop:
		while (true) {
                 //       System.out.println("Generator");
                        //System.out.println(" length at init " );   
			// create a new packet
			// Parameters:
			// model   = it's part of this model
			// "Packet" = name of the object
			// true    = yes plea se, show the packet in trace file
			Packet packet = new Packet(model, myclient,null, "Packet", true);
                        model.getTimeStamp();
                        System.out.print(packet.getName()+".");
                        rand=(int)(Math.random()*UB+1);
                        System.out.println(" Generated (Dice rolled: "+rand+") ");
                        if(rand!=1)
                        {
                          //packet.setFlow();
                        // packet.nexthop=model.NodeList.get((model.NodeList.indexOf(packet.myclient)+2)%10);
                          System.out.println("Source  " +model.NodeList.indexOf(packet.myclient));
                         packet.mydest=model.NodeList.get((model.NodeList.indexOf(packet.myclient)+3)%10);
                          int des= model.NodeList.indexOf(packet.mydest);
                          System.out.println("Destination  " +des);
                 
                         /* packet.nexthop=model.NodeList.get((model.NodeList.indexOf(packet.myclient)+1)%10);
                          int nexthop=model.NodeList.indexOf(packet.nexthop);
                          System.out.println("NextHop"+nexthop);*/
                          
                          
                        }
                        else
                        {   
                           rand=(int)(Math.random()*10);
                           if(model.NodeList.indexOf(packet.myclient)!=rand)
                           {
                               packet.mydest= model.NodeList.get(rand);
          
                               System.out.println("Source  " +model.NodeList.indexOf(packet.myclient));
                               System.out.println("Destination  " +model.NodeList.indexOf(packet.mydest));
                           }
                           else
                           {
                               packet.mydest=model.NodeList.get((rand+2)%10); //setting default dest  
                               System.out.println("Source  " +model.NodeList.indexOf(packet.myclient));
                               System.out.println("Destination  " +model.NodeList.indexOf(packet.mydest));
                           }
                          /*  if(packet.myclient.name.equals("A"))
                                packet.mydest=model.B;
                            else if(packet.myclient.name.equals("B"))
                                packet.mydest=model.A;*/
                        }
//                      /////////////////////////////////////////////////////////                                
                        System.out.println("PacketGenerated: " +model.NodeList.indexOf(packet.myclient));
//                      /////////////////////////////////////////////////////////
                       
                        packet.getFlow();

			// now let the newly created packet roll on queue
			// which means we will activate it after this packet generator
			packet.activateAfter(this);

			// wait until next packet arrival is due
			hold(new TimeSpan(model.getPacketArrivalTime()));  
			// from inside to outside...
			// we draw a new inter-arrival time
			// we make a TimeSpanobject out of it and
			// we wait for exactly this period of time
		}
	}
} /* end of process class */
