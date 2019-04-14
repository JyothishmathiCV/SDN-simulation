package distproj;

import desmoj.core.simulator.*;
import co.paralleluniverse.fibers.SuspendExecution;

/**
 * This class represents a van carrier in the ProcessesExample
 * model. The processor waits until a packet requests its service.
 * It will then fetch the container and load it onto
 * the packet.
 * If there is another packet waiting it starts serving this
 * packet. Otherwise it waits again for the next packet to arrive.
 * @author Olaf Neidhardt, Ruth Meyer
 */
public class PacketProcessor extends SimProcess {

	/** a reference to the model this process is a part of
	* useful shortcut to access the model's static components
	*/
	private ProcessesExample myModel;
        Client myclient,mynexthop;
        int hopid=-1;
	/**
	 * Constructor of the van carrier process
	 *
	 * Used to create a new VC to serve packets.
	 *
	 * @param owner the model this process belongs to
	 * @param name this VC's name
	 * @param showInTrace flag to indicate if this process shall produce output for the trace
	 */
	public PacketProcessor(Model owner, Client client, String name, boolean showInTrace) {

		super(owner, name, showInTrace);
		// store a reference to the model this VC is associated with
		myModel = (ProcessesExample)owner;
                myclient=(Client)client;
	}
	/**
	 * Describes this van carrier's life cycle.
	 *
	 * It will continually loop through the following steps:
	 * Check if there is a customer waiting.
	 * If there is someone waiting
	 *   a) remove customer from queue
	 *   b) serve customer
	 *   c) return to top
	 * If there is no one waiting
	 *   a) wait (passivate) until someone arrives (who reactivates the VC)
	 *	 b) return to top
	 */
	public void lifeCycle() throws SuspendExecution {

		// the server is always on duty and will never stop working
		while (true) {
                //       System.out.println("Server");
			//check if there is someone waiting
			if (myclient.packetQueue.isEmpty() ) {

				// NO, there is no one waiting

				// insert yourself into the idle VC queue
				myclient.idleQueue.insert(this);
				// and wait for things to happen
				passivate();
			}
			else {

				// YES, there is a customer (packet) waiting

				// get a reference to the first packet from the packet queue
				// (the type cast is necessary because the queue returns SimProcess
				// objects instead of packet objects)
				Packet nextPacket = myclient.packetQueue.first();
				// remove the packet from the queue
                                nextPacket.myclient=myclient;
				myclient.packetQueue.remove(nextPacket);  
                                mynexthop=myclient.getFlowEntry(myModel.NodeList.indexOf(nextPacket.mydest));
                                if(mynexthop!=null)
                                {
                                   // System.out.println(myModel.NodeList.indexOf(nextPacket.myclient)+" "+nextPacket.myclient.name+myModel.NodeList.indexOf(nextPacket.mydest)+" "+nextPacket.mydest.name);
                                    nextPacket.nexthop = mynexthop;
                                    nextPacket.setFlow();
                                    hopid=myModel.NodeList.indexOf(myclient.getFlowEntry(myclient.ft_desid));
                                    System.out.println(nextPacket.getName()+"."+" "+"localflowcheck " +"Nexthop "+hopid);
                                    System.out.println("Source "+myModel.NodeList.indexOf(nextPacket.myclient)+" "+nextPacket.myclient.name);
                                    System.out.println(" Destination "+myModel.NodeList.indexOf(nextPacket.mydest)+" "+nextPacket.mydest.name);
                                    nextPacket.resetFlow();
                                    myModel.NodeList.get(hopid).packetQueue.insert(nextPacket);
                                    myModel.NodeList.get(hopid).tempQueue.insert(nextPacket);
                                    myclient.printFlowTable();
                                }
                                else
                                {
                                if(!nextPacket.getFlowStatus())
                                {
                                System.out.println(myModel.getExperiment().getSimClock().getTime()+" "+ nextPacket.getName()+" Lookup could not be done by Packet Processor ,Forwarded to SDN Controller");
                                myModel.controllerQueue.insert(nextPacket);
                                }
                                else
                                {
                                    if(nextPacket.getServiced() == false)
                                    {
                                        myModel.getTimeStamp();
                                        System.out.println(nextPacket.getName()+" Flow Decisioned by Packet Processor");
                                        if(nextPacket.mydest==nextPacket.myclient)
                                        {                                      
                                        nextPacket.setServiced();                                     
                                    
                                        myModel.getTimeStamp();
                                        System.out.println(nextPacket.getName()+" Lookup done Packet Removed");
                                    
                                        continue;
                                        }
                                        
                                        System.out.println("check");
                                       
                                       //myclient.flow_table.equals(nextPacket.)
                                        hopid=myModel.NodeList.indexOf(myclient.getFlowEntry(myclient.ft_desid));
                                        System.out.println("Source  "+nextPacket.myclient.whoAmI()+" "+" Destination "+nextPacket.mydest.whoAmI()+" "+" Nexthop "+ hopid);
                                        if(hopid==-1)
                                        {
                                        myclient.printFlowTable();    
                                        myclient.ft_myid =  myModel.NodeList.indexOf(myclient);
                                        myclient.ft_desid = myModel.NodeList.indexOf(nextPacket.mydest);
                                        
                                        //System.out.println("PPname "+myModel.NodeList.indexOf(nextPacket.nexthop));
                                       // if(myclient.flow_table[myclient.ft_desid].equals(null))
                                        //{
                                        myclient.flow_table[myclient.ft_desid]=nextPacket.nexthop;
                                        }
                                        //} 
                                        
                                       // nextPacket.nexthop.packetQueue.insert(nextPacket);
                                       // nextPacket.nexthop.tempQueue.insert(nextPacket);
                                       nextPacket.resetFlow();
                                       hopid=myModel.NodeList.indexOf(myclient.getFlowEntry(myclient.ft_desid));
                                       myModel.NodeList.get(hopid).packetQueue.insert(nextPacket);
                                       myModel.NodeList.get(hopid).tempQueue.insert(nextPacket);
                                        myclient.printFlowTable();
                                       /*if(myclient.name.equals("A")) 
                                        {
                                           myModel.B.packetQueue.insert(nextPacket);
                                           myModel.B.tempQueue.insert(nextPacket);
                                        }
                                        else if(myclient.name.equals("B"))
                                        {
                                            myModel.A.packetQueue.insert(nextPacket);
                                            myModel.A.tempQueue.insert(nextPacket);
                                        }*/
                                    }
                                    
                                }
				// now serve it (fetch container and load it onto packet)
				// service time is represented by a hold of the VC process
				hold(new TimeSpan(myModel.getServiceTime()));
				// from inside to outside...
				// ...draw a new period of service time
				// ...make a TimeSpan object out of it
				// ...and hold for this amount of time

				// now the packet has received its container and can leave
				// we will reactivate it, to allow it to finish its life cycle
				nextPacket.activate(new TimeSpan(0));
				// the VC can return to top and check for a new customer
			}
		}
               }
        }
} /* end of process class */
