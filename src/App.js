import logo from './logo.svg';
import './App.css';
import { Container, Button, Modal, Box, Typography, Card } from '@material-ui/core';
import { AddCircleOutline, FolderOpen, Save } from '@material-ui/icons';
import { useState } from 'react';
import ColorPicker from 'material-ui-color-picker'

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
}
function App() {
  const [divs, setDivs] = useState([])
  const [isOpenAddModal, showOpenModal] = useState(false)
  const [currentColor, setCurrentColor] = useState('')

  const openAddModal = () => {
    showOpenModal(true)
  }
  const addDiv = () => {
    showOpenModal(false)
    setDivs([...divs, {
      id: divs.length,
      color: currentColor
    }])
  }

  const exportDivs = async () => {
    const fileData = JSON.stringify(divs);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'divs.json';
    link.href = url;
    link.click();
  }
  const renderDivs = () => {
    return divs.map(div =>
      <Card variant="outlined" key={div.id}>
        <Box style={{ backgroundColor: div.color, height: '100px' }}>
          <Typography variant="h6" component="h2">
            {div.id}
          </Typography>
        </Box>
      </Card>
    )
  }

  return (
    <Container>
      <Button variant="outlined" startIcon={<AddCircleOutline />} onClick={openAddModal}>Add Div</Button>
      <Button variant="outlined" startIcon={<Save />} onClick={exportDivs}>Export to JSON</Button>

      {renderDivs()}

      <Modal
        open={isOpenAddModal}
        onClose={() => showOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Box>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Select Div Color
            </Typography>
            <Button variant="outlined" startIcon={<Save />} onClick={addDiv}>Add Div</Button>
          </Box>
          <ColorPicker
            name='color'
            defaultValue='#000'
            value={currentColor}
            onChange={color => setCurrentColor(color)}
          />
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
