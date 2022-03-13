import logoImg from '../../assets/logo.svg';
import { Container, Content } from './style';

interface HeaderProps {
  onOpenNewTranslationModal: () => void;
}

export function Header({ onOpenNewTranslationModal }: HeaderProps) {

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTranslationModal}>
          Nova transação
        </button>

      </Content>
    </Container>
  )
}