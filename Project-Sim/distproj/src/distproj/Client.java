package distproj;
import desmoj.core.simulator.Model;
import desmoj.core.simulator.ProcessQueue;
import desmoj.core.simulator.TimeSpan;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 *
 * @author staff
 */
public class Client
{
    PacketGenerator generator;
    PacketProcessor processor;
    private final ProcessesExample myModel;
    desmoj.core.simulator.ProcessQueue<Packet> packetQueue;
    desmoj.core.simulator.ProcessQueue<Packet> flowQueue;
    desmoj.core.simulator.ProcessQueue<PacketProcessor> idleQueue;
    desmoj.core.simulator.ProcessQueue<Packet> tempQueue;
    String name;  
    Client [] flow_table=new Client[10];
    int ft_myid, ft_desid;
    public Client(Model owner, String cname)
    {
        name=new String(cname);
        myModel = (ProcessesExample)owner;
        generator = new PacketGenerator(myModel, this,name+" Packet Generator",false);
        processor = new PacketProcessor(myModel,this, name+" Packet Processor",false);
       
        packetQueue = new ProcessQueue<Packet>(myModel,name+" Packet Queue", true, true);
        flowQueue = new ProcessQueue(myModel,name+" Flow Queue (Bkp)", true, true);
        idleQueue = new ProcessQueue(myModel,name+" idle VC Queue", true, true);
        tempQueue = new ProcessQueue(myModel,name+" Temp Queue (serviced)", true, true);
    }
    public void clientInitSchedule()
    {
    //    System.out.println("length at init "+this.packetQueue.length());
        for(int i=0;i<10;i++)
        {
            flow_table[i]=null;
        }
        generator.activate(new TimeSpan(0.0));
        processor.activate(new TimeSpan(0.0));
    }
    public int whoAmI()
    {
          ft_myid =  myModel.NodeList.indexOf(this);
          return ft_myid;
    }
    public void printFlowTable()
    {
        int localid =whoAmI();
        System.out.println("Flow table of "+localid);
        for(int i=0;i<10;i++)
        {
            System.out.println(myModel.NodeList.indexOf(flow_table[i]));
        }
    }
    public Client getFlowEntry(int index)
    {
        return flow_table[index];
    }
}