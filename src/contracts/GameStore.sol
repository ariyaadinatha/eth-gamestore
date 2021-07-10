// SPDX-License-Identifier: GPL
pragma solidity >0.5.0;

contract GameStore {
    uint256 public gameCount = 0;
    mapping(uint256 => Game) public games;

    struct Game {
        uint256 id;
        string title;
        uint256 year;
        uint256 price;
        address payable storeId;
        uint256 ownedCount;
    }

    event gameCreated(
        uint256 id,
        string title,
        uint256 year,
        uint256 price,
        address payable storeId,
        uint256 ownedCount
    );

    event gameOwned(
        uint256 id,
        string title,
        uint256 year,
        uint256 price,
        address payable storeId,
        uint256 ownedCount
    );

    // Create game
    function createGame(
        string memory _title,
        uint256 _year,
        uint256 _price
    ) public {
        // Restrict
        require(bytes(_title).length > 0);
        gameCount += 1;
        games[gameCount] = Game(
            gameCount,
            _title,
            _year,
            _price,
            msg.sender,
            0
        );

        // trigger
        emit gameCreated(gameCount, _title, _year, _price, msg.sender, 0);
    }

    // constructor() public {
    //     createGame("Elder Scroll VI", 2024, 700000, address(0x0));
    // }

    // function createGame(
    //     string memory _title,
    //     uint256 _year,
    //     uint256 _price,
    //     address payable _storeId
    // ) public {
    //     gameCount++;
    //     games[gameCount] = Game(gameCount, _title, _year, _price, _storeId);
    // }

    // Payment
    function payment(uint256 _id) public payable {
        // Restrict
        require(_id > 0 && _id <= gameCount);

        // Fetch game
        Game memory _game = games[_id];
        // uint256 _price = _game.price;
        address payable _storeId = _game.storeId;

        // Transfer eth
        // address(_storeId).transfer(_price);
        address(_storeId).transfer(msg.value);

        // Update game owned
        _game.ownedCount += 1;
        games[_id] = _game;

        // Trigger
        emit gameOwned(
            _id,
            _game.title,
            _game.year,
            _game.price,
            _storeId,
            _game.ownedCount
        );
    }
}
