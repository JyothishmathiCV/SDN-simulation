package distproj;

import desmoj.core.simulator.*;
import co.paralleluniverse.fibers.SuspendExecution;

/**
 * This class represents the packet in the ProcessesExample
 * model.A packet arrives at the container terminal and requests
 * loading of a container. If possible, it is served
 * by the van carrier immediately. Otherwise it waits in the
 * parking area for its turn.
 * After service is completed, it leaves the system.
 *
 * @author Olaf Neidhardt, Ruth Meyer
 */
public class Packet extends SimProcess {

	/** a reference to the model this process is a part of
	* useful shortcut to access the model's static components
	*/
	private ProcessesExample myModel;
        private boolean flow_set, is_serviced;
        Client myclient, mydest, nexthop;
       
	/**
	 * Constructor of the packet process
	 *
	 * Used to create a new packet to be serviced by a van carrier.
	 *
	 * @param owner the model this process belongs to
	 * @param name this packet's name
	 * @param showInTrace flag to indicate if this process shall produce
	 *                    output for the trace
	 */
	public Packet(Model owner, Client client,Client dest, String name, boolean showInTrace) {

		super(owner, name, showInTrace);
		// store a reference to the model this packet is associated with
		myModel = (ProcessesExample)owner;
                flow_set=false;
                myclient = (Client)client;
                mydest=null;
                nexthop=null;
                is_serviced=false;
	}
        public boolean getFlowStatus()
        {
         return flow_set;
        }
        public void getFlow()
        {
            if(flow_set==false)
             System.out.println("Flow Not Set");
            else
                System.out.println("Open Flow Set");
        }
        public void setFlow()
        {
            flow_set=true;
        }
        public void resetFlow()
        {
            flow_set=false;
        }
        public boolean getServiced()
        {
            return is_serviced;
        }
        public void setServiced()
        {
           is_serviced=true;
        }
         
	/**
	 * Describes this packet's life cycle:
	 *
	 * On arrival, the packet will enter the queue (parking lot).
	 * It will then check if the van carrier is available.
	 * If this is the case, it will activate the van carrier to 
	 * get serviced and transfer the control to the VC.
	 * Otherwise it just passivates (waits).
	 * After service it leaves the system.
	 */
	public void lifeCycle() throws SuspendExecution {

		// enter parking-lot
           //     System.out.println("length ");
            //    System.out.println("length at init "+myclient.packetQueue.length());
		myclient.packetQueue.insert(this);
		sendTraceNote("PacketQueuelength: "+ myclient.packetQueue.length());
          //       System.out.println("packet");
		// check if a VC is available
		if (!myclient.idleQueue.isEmpty()) {
			// yes, it is

			// get a reference to the first VC from the idle VC queue
			// (the type cast is necessary because the queue returns SimProcess
			// objects instead of VC objects)
			PacketProcessor Processor = myclient.idleQueue.first();
			// remove the van carrier from the queue
			myclient.idleQueue.remove(Processor);

			//place the VC on the eventlist right after me,
			//to ensure that I will be the next customer to get serviced
			Processor.activateAfter(this);
		}

		// wait for service
		passivate();

		// Ok, I am back online again, which means I was serviced
		// by the VC. I can leave the systems now.
		// Luckily I don't have to do anything more than sending
		// a message to the trace file, because the
		// Java VM garbage collector will get the job done.
		// Bye!
		sendTraceNote("Packet was serviced and leaves system.");
	}
} /* end of process class */
