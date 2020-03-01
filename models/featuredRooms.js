const featuredRoom =
{
    allfeaturedRoomsDB : [],

    init()
    {

        this.allfeaturedRoomsDB.push(
        {
            id: 1011,
            name: `Toronto Loft`,
            image: `/img/f-room-01.jpg`,
            price: 199
        });
        this.allfeaturedRoomsDB.push(
        {
            id: 1022,
            name: `Toronto Lake View Loft`,
            image: `/img/f-room-02.jpg`,
            price: 130
        });
        
        this.allfeaturedRoomsDB.push(
        {
            id: 1033,
            name: `Private appartment with Patio`,
            image: `/img/f-room-03.jpg`,
            price: 190
        });
        
    },
    getallfeaturedRooms()
    {
        return this.allfeaturedRoomsDB;
    }

}


featuredRoom.init();
module.exports=featuredRoom;