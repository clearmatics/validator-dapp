pragma solidity ^0.4.23;
pragma experimental ABIEncoderV2;

contract Glienicke {

    struct Enode {
        string node;
        string name;
        bytes32 enodeHash;
    }

    event test(string[],string[]);

    mapping (string => uint256) private m_enodes_idx;

    Enode[] private enodes_arr;

    constructor() public {}

/*
========================================================================================================================
    Functions
========================================================================================================================
*/

    function IsAllowed(string _enode) public view returns (bool) {
        return (enodes_arr.length > m_enodes_idx[_enode] && compareStrings(enodes_arr[m_enodes_idx[_enode]].enodeHash, _enode));
    }

    function addEnode(string memory _enode, string _name) public {
        // if node alredy exist do nothing
        if (enodes_arr.length > m_enodes_idx[_enode] && compareStrings(enodes_arr[m_enodes_idx[_enode]].enodeHash, _enode)) {
            return;
        }

        // Add enode to mapping
        m_enodes_idx[_enode] = enodes_arr.length;

        // Create new enode struct
        Enode memory newEnode;
        newEnode.node = _enode;
        newEnode.name = _name;
        newEnode.enodeHash = keccak256(abi.encodePacked(_enode));

        enodes_arr.push(newEnode);

    }

    function removeEnode(string memory _enode) public {
        // if enode string doesn't match than do nothing (this is because m_enodes[] can't be null,is only 0)
        if(!compareStrings(enodes_arr[m_enodes_idx[_enode]].enodeHash, _enode)) {
            return;
        }

        // swap element if not last
        if((m_enodes_idx[_enode] + 1) < enodes_arr.length) { // if element to be removed is not the last one
            Enode memory last_enode =  enodes_arr[enodes_arr.length - 1];
            uint256 new_idx = m_enodes_idx[_enode];
            m_enodes_idx[last_enode.node] = new_idx;
            enodes_arr[new_idx] = last_enode;
        }
        // delete reference from map to element
        delete m_enodes_idx[_enode];

        // delete last element
        delete enodes_arr[enodes_arr.length - 1];
        enodes_arr.length--;

    }

/*
========================================================================================================================
    Helpers
========================================================================================================================
*/
    function compareStrings(bytes32 a, string memory b) private pure returns (bool) {
      return (a == keccak256(abi.encodePacked(b)));
    }


/*
========================================================================================================================
    Getters
========================================================================================================================
*/

    function getTotalEnodes() public view returns (uint256) {
      return enodes_arr.length;
    }

    function getEnodes(uint256 idx) public view returns (string, string) {
      return (enodes_arr[idx].node, enodes_arr[idx].name);
    }

    function getEnodeIdx(string memory _enode) public returns (uint256) {
      return m_enodes_idx[_enode];
    }

    function getEnodeData() public view returns (string[], string[]) {
        string[] memory enodes = new string[](enodes_arr.length);
        string[] memory names = new string[](enodes_arr.length);

        for (uint256 i = 0; i < enodes_arr.length; i++) {
            Enode currNode = enodes_arr[i];
            enodes[i] = currNode.node;
            names[i] = currNode.name;
        }

        emit test(enodes, names);
        return (enodes, names);

    }



}
